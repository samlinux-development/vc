import { Component, createSignal } from 'solid-js';
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal';

import { useAuth } from '../context/AuthContext';
import { AuthContextType } from '../context/AuthContextType';

import { CreateActor } from "../ic/CreateActor";

const LoggedIn: Component = () => {
  
  // this is the hook to get the context
  const {isAuthenticated, setIsAuthenticated, clientIdentity, setClientIdentity} = useAuth() as AuthContextType;

  // loding signal
  const [isLoading, setIsLoading] = createSignal(false);

  // do an authenticated call to the IC if the user is logged in
  const whoami = async () => {
   
    try {
      // check if you are logged in
      let options;
      let requestStart = new Date();
      if(isAuthenticated()){
        // Start loading
        setIsLoading(true); 

        // set the client identity from the context
        options = {
          agentOptions: {identity : clientIdentity()}
        };
  
        // Call the IC
        let Ic = CreateActor(options);
    
        // get the function counter
        let whoami = await Ic.whoami();
        
        // get the time in seconds
        let requestEnd : Date = new Date();
        let responseTime: number = requestEnd.getTime() - requestStart.getTime();
        let rrt : number = responseTime/1000;    
        console.log('Request Response Time (RRT): '+rrt+' seconds !');
        const principalText = (whoami as Principal).toText();
        document.getElementById('whoamiResponse')!.innerHTML = 'Your Backend Principal ID: '+principalText + ' <br>Request Response Time (RRT): '+rrt+' seconds !';

        // Stop loading
        setIsLoading(false);
      } 
      else {
        // should not happen
        document.getElementById('whoamiResponse')!.innerText = 'You are not logged in';
      }
  
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // do the logout and clear also the signals
  const logoutII = async () => {
    const authClient = await AuthClient.create();
    authClient.logout();
    setIsAuthenticated(false);
    setClientIdentity(undefined);
  }


  return (
    <div>
      <div id="loginStatus"></div>
      <button id="logoutBtn" onClick={ logoutII }>Logout</button>
      <div>
        <button id="whoamiBtn" onClick={ whoami } disabled={isLoading()}>Whoami</button>
        <div id="whoamiResponse"></div>
      </div>
      
    </div>
  )
}

export default LoggedIn;

