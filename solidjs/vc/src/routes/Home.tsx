const Home = () => {

  return (
    <div>
      <p>
        This example illustrates how to use an Internet Identity for logging in and out of a Svelte application running on the Internet Computer (IC). Additionally, it demonstrates how to make an authenticated call to the backend canister.
      </p>

      <p>
        You can login with your own Internet Identity and see the your client principal ID and the backend principal ID for that given dApp. <strong>It must be the same!</strong> Now try to login on the member page.
      </p>
      <p>
      You can find the repository on Github: <a target="_blank" href="https://github.com/samlinux-development/vc">https://github.com/samlinux-development/vc</a>
      </p>
    </div>
  )
}
export default Home;
