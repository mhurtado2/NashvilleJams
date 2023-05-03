import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";



const JamDeets = ({ jam }) => {
   
  return (
    <Card >
      <CardBody>
          <div>
            <h2>{jam.jamName}</h2>
            <div>
            <img 
            src= {jam.imageUrl} 
            alt = {jam.jamName}
            className = "jam-img"
            />
            </div>
            <p>Venue Name : {jam.venueName}</p>
            <p>Genre : {jam.genre?.name}</p>
            <p>Area Of Town : {jam.areaOfTown?.name}</p>
            <p>Address : {jam.address}</p>
            
          </div>
      </CardBody>
    </Card>
  );
};

export default JamDeets;