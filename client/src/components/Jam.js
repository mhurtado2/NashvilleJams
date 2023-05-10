import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Jam = ({ jam }) => {
  return (
    <Card
      className="d-flex flex-row mb-2"
      style={{ border: "2px solid black" }}
    >
      <CardBody style={{ backgroundColor: "rgba(173, 165, 169, 0.8)" }}>
        <div>
          <Link to={`details/${jam.id}`}>{jam.jamName}</Link>
          <div>
            <img
              src={jam.imageUrl}
              alt={jam.jamName}
              className="jam-img"
              style={{ width: "300px", height: "200px", margin: "20px" }}
            />
          </div>
          <div style={{ borderRadius: "20px", textDecoration: "underline" }}>
            <em>
              <b>Area Of Town:</b> {jam.areaOfTown?.name}
            </em>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Jam;
