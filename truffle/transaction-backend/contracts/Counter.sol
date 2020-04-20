pragma solidity >=0.4.21 <0.7.0;

contract Counter {

  uint public count;

  constructor() public {
    count = 0;
  }
  
  function increment() public {
    count++;
  }
}
