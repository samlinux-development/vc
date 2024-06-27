<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";

  import Home from "./routes/Home.svelte";
  import Member from "./routes/Member.svelte";

  export let url:string = "";
  const about:string = "This is a starter dApp built with Svelte.";


</script>

<main>

  <Router {url}>
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/member">Member</Link>
    </nav>
    <div>
      <h2>{ about }</h2>
      <Route path="/"><Home /></Route>
      <Route path="/member"><Member /></Route>
    </div>
  </Router>

</main>