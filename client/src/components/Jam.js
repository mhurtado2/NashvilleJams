import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";



const Jam = ({ jam }) => {
   
  return (
    <Card >
      <CardBody>
          <p>
            <Link to={`details/${jam.id}`}>{jam.jamName}</Link>
            <img 
            src= {jam.imageUrl} 
            alt = {jam.jamName}
            className = "jam-img"
            />
          </p>
      </CardBody>
    </Card>
  );
};

export default Jam;