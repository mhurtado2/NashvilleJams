import React from "react";
import { Card, CardBody } from "reactstrap";


const Jam = ({ jam }) => {
  return (
    <Card >
      <CardBody>
          <p>
            <strong>{jam.jamName}</strong>
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