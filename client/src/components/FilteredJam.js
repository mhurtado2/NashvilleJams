import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";



const FilteredJam = ({ jam }) => {
   
  return (
    <Card className="d-flex flex-row justify-content-between mb-2 shadow">
      <CardBody >
          <div>
            <h2>{jam.jamName}</h2>
            <div>
            <img 
            src= {jam.imageUrl} 
            alt = {jam.jamName}
            className = "jam-img"
            style={{width : '300px', height : "200px", margin : '20px'}}
            />
            </div>
            <p>Venue Name : {jam.venueName}</p>
            <p>Area Of Town : {jam.areaOfTown?.name}</p>
            <p>Address : {jam.address}</p>
            
          </div>
      </CardBody>
    </Card>
  );
};

export default FilteredJam;