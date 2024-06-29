
import { Component } from 'solid-js';
import { AuthClient } from "@dfinity/auth-client";

import { useAuth } from '../context/AuthContext';
import { AuthContextType } from '../context/AuthContextType';

const NotLoggedIn: Component = () => {
 
  const { setIsAuthenticated} = useAuth() as AuthContextType;
  const loginII = async () => {

    const authClient = await AuthClient.create();
    let iiUrl : string;
    /*
    if (process.env.DFX_NETWORK !== "ic"){
      PUBLIC_INTERNET_IDENTITY_CANISTER_ID = process.env.CANISTER_ID_INTERNET_IDENTITY;
      iiUrl = `http://${PUBLIC_INTERNET_IDENTITY_CANISTER_ID}.localhost:4943`;
    } else {
      iiUrl = 'https://identity.internetcomputer.org/#authorize';
    }
    */
   iiUrl = 'https://identity.internetcomputer.org/#authorize'
    iiUrl = 'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943';

    await new Promise<void>((resolve, reject) => {
      authClient.login({
        identityProvider: iiUrl,
        onSuccess: resolve,
        onError: reject,
      }).then(() => {
        setIsAuthenticated(true);

      }).catch((e) => {
        console.log("login error", e)
      });
    });
  
  };
  return (
    <div>
      <div>You are not Logged In</div>
      <div>Login to see this page !</div>
      <div>
        <button id="loginBtn" onClick={ loginII }>Login with Internet Identity</button>
      </div>
    </div>
  )
}

export default NotLoggedIn;

