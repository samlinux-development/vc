// IC imports
import { Actor, HttpAgent } from "@dfinity/agent";

// Backend canister import
import { idlFactory } from "../../../../src/declarations/backend/backend.did.js";

// custom type definitions
type OptionsType = {
  agentOptions?: import("@dfinity/agent").HttpAgentOptions;
  actorOptions?: import("@dfinity/agent").ActorConfig;
};

type ReturnType = {
  whoami(): any
  get(): any
};

// create an actor
export function CreateActor(options?:OptionsType):ReturnType {

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

  const agent = new HttpAgent({ 
    ...options.agentOptions });
  
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