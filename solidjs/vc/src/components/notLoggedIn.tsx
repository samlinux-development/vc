
import { Component } from 'solid-js';
import { AuthClient } from "@dfinity/auth-client";

import { useAuth } from '../context/AuthContext';
import { AuthContextType } from '../context/AuthContextType';

const NotLoggedIn: Component = () => {
  
  const { isAuthenticated, setIsAuthenticated, setClientIdentity} = useAuth() as AuthContextType;
  const loginII = async () => {

    const authClient = await AuthClient.create();
    let iiUrl : string;

    if (process.env.DFX_NETWORK !== "ic"){
      iiUrl = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
    } else {
      iiUrl = 'https://identity.internetcomputer.org/#authorize';
    }

    await new Promise<void>((resolve, reject) => {
      authClient.login({
        identityProvider: iiUrl,
        onSuccess: function() {
          setIsAuthenticated(true);
          resolve();
        },
        onError: reject,
      }).catch((e) => {
        console.log("login error", e)
      });
    });
    
    if(isAuthenticated()){
      // set the client identity to the context
      let identity = authClient.getIdentity();
      setClientIdentity(identity);
    }
    
  };
  return (
    <div>
      <div>Login to see this page !</div>
      <div>
        <button id="loginBtn" onClick={ loginII }>Login with Internet Identity</button>
      </div>
    </div>
  )
}

export default NotLoggedIn;

