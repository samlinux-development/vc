actor {

  // a simple click counter
  stable var counter = 0;
  
  public shared ({caller}) func whoami() : async Principal {
    counter += 1;
    return caller;
  };

  // Get the value of the counter.
  public query func get() : async Nat {
    return counter;
  };

};
