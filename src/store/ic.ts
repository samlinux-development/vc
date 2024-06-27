// Svelte imports
// we need a writeable because we update the actor after a successful login
import { writable } from "svelte/store";

// IC imports
import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

// Backend canister import
import { idlFactory } from "../declarations/backend/backend.did.js";

// type imports
import type { ActorSubclass, Identity } from "@dfinity/agent";
import type { _SERVICE } from "../declarations/backend/backend.did.ts";

// custom type definitions
type OptionsType = {
  agentOptions?: import("@dfinity/agent").HttpAgentOptions;
  actorOptions?: import("@dfinity/agent").ActorConfig;
};

type ReturnType = {
  actor: import("@dfinity/agent").ActorSubclass<import("../declarations/backend/backend.did.ts")._SERVICE>,
  loginII: () => Promise<boolean>,
  logoutII: () => Promise<boolean>
};

// Get the identity
async function getIdentity(): Promise<Identity>{
  try {
    const authClient = await AuthClient.create();
    //console.log('AuthClient created successfully', authClient);
    const identity = authClient.getIdentity();
    if (!identity) {
      throw new Error('Identity not found');
    }
    return identity;
  } catch (error) {
    //console.error('Error creating AuthClient or fetching Identity', error);
    throw new Error('Failed to obtain Identity');
  }
}

// Get the identity - this works but ...
let identity = getIdentity();


// create an actor
export function createActor(options?:OptionsType):ReturnType {

  const hostOptions = {
    host:
      process.env.DFX_NETWORK === "ic"
        ? `https://${process.env.CANISTER_ID_BACKEND}.ic0.app`
        : `http://${process.env.CANISTER_ID_BACKEND}.localhost:4943`,
  };
  
  // handle the case where the options are not set
  if (!options) {
    options = { agentOptions: hostOptions };
  } else if (!options.agentOptions) {
    options.agentOptions = hostOptions;
  } else if (options.agentOptions) {
    options.agentOptions.host = hostOptions.host;
  }

  // in case of a reload, we need to set the identity again
  if(options.agentOptions !== undefined) { 
    options.agentOptions.identity = identity;
  }
  
  const agent = new HttpAgent({ ...options.agentOptions });
  
  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID_BACKEND,
    ...options?.actorOptions,
  });
}

// create a writeable store for an easy access to the actor from the components
export const ic = writable<ReturnType>({
  actor: createActor() as unknown as ActorSubclass<_SERVICE>,
  loginII: loginII,
  logoutII: logoutII
});


// do then login and check if the user is logged in
export async function loginII(): Promise<boolean> {
  const authClient = await AuthClient.create();
  let PUBLIC_INTERNET_IDENTITY_CANISTER_ID : string;
  let iiUrl : string;

  if (process.env.DFX_NETWORK !== "ic"){
    PUBLIC_INTERNET_IDENTITY_CANISTER_ID = process.env.CANISTER_ID_INTERNET_IDENTITY;
    iiUrl = `http://${PUBLIC_INTERNET_IDENTITY_CANISTER_ID}.localhost:4943`;
  } else {
    iiUrl = 'https://identity.internetcomputer.org/#authorize';
  }

  let userIsAuthenticated = false;
  await new Promise<void>((resolve, reject) => {
    authClient.login({
      identityProvider: iiUrl,
      onSuccess: resolve,
      onError: reject,
    }).then(() => {
      userIsAuthenticated = true;
    }).catch((e) => {
      console.log("login error", e)
    });
  });

  // if user is authenticated, we can get the identity and update the actor
  if(userIsAuthenticated){
    // At this point we're authenticated, and we can get the identity from the auth client:
    identity = new Promise<Identity>((resolve, reject) => {
      const identity = authClient.getIdentity();
      if (identity) {
        resolve(identity);
      } else {
        reject("No identity found");
      }
    });

    // update the actor with the new identity after a successful login
    let options = {agentOptions: {identity: identity}}; 
    ic.update((state) => {
      const newActor = createActor(options) as any; 
      return {...state, actor: newActor};
    });
  }
  
  return userIsAuthenticated;
};

// do the logout and check if the user is logged out
export async function logoutII(): Promise <boolean> {
  const authClient = await AuthClient.create();
  authClient.logout();

  // check the status - assuming that the user is logged out
  let userIsAuthenticated = true;
  if(!authClient.isAuthenticated()) {
    userIsAuthenticated = false;
  }

  return userIsAuthenticated;
}

