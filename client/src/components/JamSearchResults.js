import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const JamSearchResults = ({ jam }) => {
  return (
    <Card className="d-flex flex-row mb-2">
      <CardBody>
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
          <div style={{ backgroundColor: "gold", borderRadius: "20px" }}>
            Area Of Town: {jam.areaOfTown?.name}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default JamSearchResults;
