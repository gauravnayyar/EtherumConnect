pragma solidity ^0.4.25;

contract RegisterPolicyHoldersNRIC {
    function isNRICHashExist(bytes32 _nricHash) public returns(bool _exists);
}

contract DeceasedRegistry {
    function registerNRIC(bytes32 _nricHash, bool _matchFound);
    function updateMatchStatus(bytes32 _nricHash, bool _matchFound);
    function syncMatchStatus(bytes32 _nricHash) public;
    function updateAcknowledgemntStatus(bytes32 _nricHash);
    function getMatchedStatus(bytes32 _nricHash) public returns (bool _matched);
    function getAcknowledgementStatus(bytes32 _nricHash) public returns (bool _acknowledged);
    function getNricHashMatchedLenght() constant returns (uint _length);
    function getNricHashUnmatchedLenght() constant returns (uint _length);
    function getNricHashUnsyncedLenght() constant returns (uint _length);
    function getNricHashMatchedValueByIndex(uint _index) public returns (bytes32 _nricHashmatched);
    function getNricHashUnmatchedValueByIndex(uint _index) public returns (bytes32 _nricHashunmatched);
    function getNricHashUnsyncedValueByIndex(uint _index) public returns (bytes32 _nricHashunsynced);
}

contract LifeChainLogicContract {
    
    RegisterPolicyHoldersNRIC registerPolicyHoldersNRIC;
    DeceasedRegistry deceasedRegistry;
    
    function LifeChainLogicContract(address _registerPolicyHoldersNRIC, address _deceasedRegistry) public {
        registerPolicyHoldersNRIC = RegisterPolicyHoldersNRIC(_registerPolicyHoldersNRIC);
        deceasedRegistry = DeceasedRegistry(_deceasedRegistry);
    }
    function getRegisterPolicyHoldersNRICAddress() public constant returns (address _registerPolicyHoldersNRIC) {
        return _registerPolicyHoldersNRIC = registerPolicyHoldersNRIC;
    }
    function getDeceasedRegistryAddress() public constant returns (address _deceasedRegistry) {
        return _deceasedRegistry = deceasedRegistry;
    }
    
    function registerDeceases(bytes32 _nricHash) {
        bool _matchFound = registerPolicyHoldersNRIC.isNRICHashExist(_nricHash);
        deceasedRegistry.registerNRIC(_nricHash, _matchFound);
    }
    
    function updateMatchStatus(bytes32 _nricHash, bool _matchFound){
        deceasedRegistry.updateMatchStatus(_nricHash, _matchFound);
    }
    
    function syncMatchStatus(bytes32 _nricHash) public {
        deceasedRegistry.syncMatchStatus(_nricHash);
    }
    
    function submitAcknowledgement(bytes32 _nricHash)  {
        deceasedRegistry.updateAcknowledgemntStatus(_nricHash);
    }
    
    function getMatchedStatus(bytes32 _nricHash) constant returns (bool _matched){
        return deceasedRegistry.getMatchedStatus(_nricHash);
    }
    
    function getAcknowledgementStatus(bytes32 _nricHash) constant returns (bool _acknowledged){
        return deceasedRegistry.getAcknowledgementStatus(_nricHash);
    }
    
    function getNricHashMatchedLenght() constant returns (uint _length) {
        return deceasedRegistry.getNricHashMatchedLenght();
    }
    function getNricHashUnmatchedLenght() constant returns (uint _length) {
        return deceasedRegistry.getNricHashUnmatchedLenght();
    }
    function getNricHashUnsyncedLenght() constant returns (uint _length) {
        return deceasedRegistry.getNricHashUnsyncedLenght();
    }
    
    function getNricHashMatchedValueByIndex(uint _index) public returns (bytes32 _nricHashmatched){
        return deceasedRegistry.getNricHashMatchedValueByIndex(_index);
    }
    
    function getNricHashUnmatchedValueByIndex(uint _index) public returns (bytes32 _nricHashunmatched){
        return deceasedRegistry.getNricHashUnmatchedValueByIndex(_index);
    }
    
    function getNricHashUnsyncedValueByIndex(uint _index) public returns (bytes32 _nricHashunsynced){
        return deceasedRegistry.getNricHashUnsyncedValueByIndex(_index);
    }

}