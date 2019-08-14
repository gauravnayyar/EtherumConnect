pragma solidity ^0.5.0;

contract parent{
    uint parentNumber=534334;
    function getNumbersec() public view returns (uint){
        return parentNumber;
    }
    // function getNumbersec() public  returns (uint){
    //     return 3;
    // }
}

contract kid is parent{
    
    uint kidNumber=34343;
    function getNumber() public view returns (uint){
        return parent.getNumbersec(); //searches for this function on the parent
    }
}

// contract test is parent, kid{
//     function callNumber() public view returns (uint){
//         return getNumber();
//     }
// }