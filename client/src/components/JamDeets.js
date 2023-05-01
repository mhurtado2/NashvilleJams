import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";



const JamDeets = ({ jam }) => {
   
  return (
    <Card >
      <CardBody>
          <div>
            <Link to={`details/${jam.id}`}>{jam.jamName}</Link>
            <div>
            <img 
            src= {jam.imageUrl} 
            alt = {jam.jamName}
            className = "jam-img"
            />
            </div>
            <p>Venue Name: {jam.venueName}</p>

            <p>Address: {jam.address}</p>
            
          </div>
      </CardBody>
    </Card>
  );
};

export default JamDeets;