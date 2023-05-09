import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const JamDeets = ({ jam }) => {
  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <Card
              style={{
                height: "100%",
                backgroundColor: "rgba(173, 165, 169, 0.8)",
              }}
            >
              <CardBody>
                <div>
                  <h2>{jam.jamName}</h2>
                  <div>
                    <img
                      src={jam.imageUrl}
                      alt={jam.jamName}
                      className="jam-img"
                      style={{ width: "400px" }}
                    />
                  </div>
                  <p>
                    <b>Venue Name</b> : <em>{jam.venueName}</em>
                  </p>
                  <p>
                    <b>Genre</b> : <em>{jam.genre?.name}</em>
                  </p>
                  <p>
                    <b>Area Of Town</b> : <em>{jam.areaOfTown?.name}</em>
                  </p>
                  <p>
                    <b>Address</b> : <em>{jam.address}</em>
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              style={{
                height: "100%",
                backgroundColor: "rgba(173, 165, 169, 0.8)",
              }}
            >
              <CardBody>
                <article>{jam.jamDescription}</article>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JamDeets;

//yo
