import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";



const Jam = ({ jam }) => {
   
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
            <div>Area Of Town: {jam.areaOfTown?.name}</div>
          </div>
      </CardBody>
    </Card>
  );
};

export default Jam;