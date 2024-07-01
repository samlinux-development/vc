<p align="left" >
  <img width="240"  src="public/icAcademy.png">
</p>

# Internet Computer + Svelte + TS + Vite + Internet Identity

This project is provided by the [IC-Academy](https://blog.icacademy.at) to help you get started with development on the Internet Computer using Svelte, TypeScript and Vite.

The main goal of this repository is to illustrates how to use an Internet Identity for logging in and out of a Svelte application running on the Internet Computer (IC). Additionally, it demonstrates how to make an authenticated call to the backend canister.

The project has the following main features:

- Svelte frontend with routing of two routes, one is public and the other is private.
- A central Svelte store to manage an actor function to call the backend for separate functions as well the login and logout functions.
- A user can login and logout using the Internet Identity.
- If a user is logged in, the user can call the backend functions with an authenticated call.
- If the user is logged in and refreshes the page, the user is still logged in until he/she/it clicks the logout button.
- The current user principal is shown from the client side and from the server side. Both must be the same.

A running example can be found 

- [for Svelte](https://wb7hf-myaaa-aaaak-qinuq-cai.icp0.io/)
- [for SolidJs](https://claok-lqaaa-aaaak-qioda-cai.icp0.io/)

**Note** to get a clean git repository. A tool called “digit” is used. Make sure you have it installed. If you haven't installed it yet, you can do so using the following command.

> Tested on DFX version: 0.20.1

```bash
npm install -g degit
```

Summary of installation steps:

1. Check needed tools
2. Install and discuss the github repository
3. Start a local Internet Computer replica
4. Deploy frontend and backend canister to local replica or Motoko playground
5. Test the Motoko backend functions (sayHelloTo, calc)


```bash
mkdir myapp && cd myapp
```
```bash
npx degit https://github.com/samlinux-development/vc
npm install
```
```bash
dfx start --clean --background
```
## Local deployment
```bash   
dfx deploy 
dfx canister id frontend
```

Open your browser and use the following URL scheme:

- http://[canisterId].localhost:4943


## Mainnet deployment
```bash
dfx identity use <your-name>
dfx canister create backend --with-cycles 1T --ic
dfx canister create frontend --with-cycles 1T --ic
dfx canister create solidjs --with-cycles 1T --ic

# the local Internet Identity replica should not be used for the mainnet deployment
dfx deploy --network ic
```

