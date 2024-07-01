import { Show , onMount, useContext} from "solid-js"
import { AuthClient } from "@dfinity/auth-client";

import { useAuth } from '../context/AuthContext';
import { AuthContextType } from '../context/AuthContextType';

import LoggedIn from "../components/loggedIn";
import NotLoggedIn from "../components/notLoggedIn";


const Member =  () => {
  const { isAuthenticated, setIsAuthenticated, clientIdentity, setClientIdentity} = useAuth() as AuthContextType;

  onMount(async () => {
    let authClient: AuthClient = await AuthClient.create();
    let authOK: boolean = await authClient.isAuthenticated();
    (authOK)? setIsAuthenticated(true): setIsAuthenticated(false);

    if(authOK){
      let identity = authClient.getIdentity();
      setClientIdentity(identity);
    }
  });
  

  return (
   
     <div>
      <h2>Hello Member</h2>
      <div id="loginStatus"> Client Principal ID: { clientIdentity()?.getPrincipal().toText() }</div>
      
      {isAuthenticated() ? <div>You are logged In</div> : <div>You are not Logged In</div>}

      <Show when = { isAuthenticated() } fallback = { <NotLoggedIn /> }>
        <LoggedIn />
      </Show>
    </div>

  )
}
export default Member;
