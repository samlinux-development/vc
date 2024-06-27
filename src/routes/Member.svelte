<script lang="ts">

import { onMount } from 'svelte';
import { ic } from '../store/ic.ts';

import { AuthClient } from "@dfinity/auth-client";
import { Principal } from '@dfinity/principal';

let userIsAuthenticated = false;
let authClient: AuthClient;


onMount(async () => {
  authClient = await AuthClient.create();
  
  let isAuthenticated = await authClient.isAuthenticated();
  if(isAuthenticated){
    userIsAuthenticated = isAuthenticated;
      let identity = authClient.getIdentity();

      document.getElementById("loginStatus")!.innerText = 'Your Client Pricipal ID: '+identity.getPrincipal().toText();
    }
});

const loginII = async() =>{
  const isAuthenticated = await $ic.loginII();
  userIsAuthenticated = isAuthenticated;

  authClient = await AuthClient.create();
  let identity = authClient.getIdentity();
  document.getElementById("loginStatus")!.innerText = 'Your Client Pricipal ID: '+identity.getPrincipal().toText();
}

const logoutII = async () => {
  const isLogedout = await $ic.logoutII();
  
  if(isLogedout){
    document.getElementById("loginStatus")!.innerText = '';
    userIsAuthenticated = false; 
  }
}

const clickMe = async () => {
  try {
    // Call the IC
    let whoami = await $ic.actor.whoami();
    const principalText = (whoami as Principal).toText();
    document.getElementById('whoamiResponse')!.innerText = 'Your Backend Principal ID: '+principalText;
  } catch (err: unknown) {
    console.error(err);
  }
};

</script>

 <div>
   <h2>Hello Member</h2>
   <div id="loginStatus"></div>

   {#if userIsAuthenticated }
      <div>You are logged In</div>
      <button id="logoutBtn" on:click={logoutII}>Logout</button>
      <div>DO an authenticated call</div>
      <button on:click={clickMe}>whoami</button>
      
      <div id="whoamiResponse"></div>
    {:else}
      <div>Not Logged In</div>
      <div>Login to see this page !</div>
      <button id="loginBtn" on:click={loginII}>Login with Internet Identity</button>
    {/if}
 </div>

<style></style>