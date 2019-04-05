pragma solidity >=0.4.22 < 0.7.0;

contract FoodSafe
{
    struct Location
    {
            string Name;
            uint LocationID;
            uint PreviousLocationID;
            uint TimeStamp;
            string Secret;
    }

    mapping(uint => Location) Trail;
    uint8 TrailCount=0;

    function AddNewLocation(uint LocationID,string memory Name,string memory Secret) public
    {
        Location memory NewLocation;
        NewLocation.Name = Name;
        NewLocation.LocationID = LocationID;
        NewLocation.Secret = Secret;
        NewLocation.TimeStamp=now;
        if(TrailCount!=0)
        {
            NewLocation.PreviousLocationID=Trail[TrailCount].LocationID;
        
        }
        Trail[TrailCount]=NewLocation;
        TrailCount++;
    }

    function GetTrailCount() view public returns(uint8) 
    {
        return TrailCount;
    } 

    function GetLocation(uint8 TrailNo) view public returns (string memory ,uint,uint,uint,string memory)
    {
        return (Trail[TrailNo].Name, Trail[TrailNo].LocationID,Trail[TrailNo].PreviousLocationID,Trail[TrailNo].TimeStamp ,Trail[TrailNo].Secret );
    }
}