import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";


const JamDeets = ({ jam }) => {
   
  return (
<>
    <Container>
      <Row>
        <Col md={6}>
            <Card style={{height: "100%", backgroundColor: "rgba(173, 165, 169, 0.8)"}} >
              <CardBody>
                  <div>
                    <h2>{jam.jamName}</h2>
                    <div>
                    <img 
                    src= {jam.imageUrl} 
                    alt = {jam.jamName}
                    className = "jam-img"
                    style = {{width: "400px"}}
                    />
                    </div>
                    <p>Venue Name : {jam.venueName}</p>
                    <p>Genre : {jam.genre?.name}</p>
                    <p>Area Of Town : {jam.areaOfTown?.name}</p>
                    <p>Address : {jam.address}</p>
                    
                  </div>
              </CardBody>
            </Card>
          </Col>

        <Col md={6}>
          <Card style={{height: "100%", backgroundColor: "rgba(173, 165, 169, 0.8)"}}>
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
