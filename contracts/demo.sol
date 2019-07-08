pragma solidity >=0.4.22 < 0.7.0;

contract SimpleStorage {
    uint storedData;
uint xyz;
    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}