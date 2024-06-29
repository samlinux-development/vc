
import { Component } from 'solid-js';
import { AuthClient } from "@dfinity/auth-client";

import { useAuth } from '../context/AuthContext';
import { AuthContextType } from '../context/AuthContextType';

const LoggedIn: Component = () => {
  const {setIsAuthenticated} = useAuth() as AuthContextType;

  const logoutII = async () => {
    const authClient = await AuthClient.create();
    authClient.logout();
    setIsAuthenticated(false);
  }

  return (
    <div>
      <div id="loginStatus"></div>
      <div>You are logged In</div>
      <button id="logoutBtn" onClick={ logoutII }>Logout</button>
    </div>
  )
}

export default LoggedIn;

