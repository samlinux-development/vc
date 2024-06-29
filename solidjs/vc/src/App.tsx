import type { Component, JSX} from 'solid-js';
import { Router, Route } from "@solidjs/router";

import Home from "./routes/Home";
import Member from "./routes/Member";

const App: Component = () => {

  const App = (props: {children?: JSX.Element}) => (
    <>
      <div class="app">
      <nav>
        <a href="/">Home</a> | 
        <a href="/member">Member</a>
      </nav>

      <h1>This is a starter dApp built with SolidJS!</h1>

        {props.children}
      </div>
    </>
  )

  return (

      <Router root={App}>
        <Route path="/" component={Home} />      
        <Route path="/member" component={Member} />
      </Router>

  );
};

export default App;
