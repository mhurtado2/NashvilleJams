import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Tooltip } from "reactstrap";



const FilteredJam = ({ jam }) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const toolTipStyle = {
    fontSize: "1.2rem",
    maxWidth: "500px"
  };
   
  return (
    
    <Card className="d-flex flex-wrap justify-content-between shadow mb-2">
      <CardBody style={{backgroundColor: "rgba(173, 165, 169, 0.8)"}}>
          <div>
              <h2>{jam.jamName}</h2>
               <div>
                  <div 
                  onMouseEnter={toggleTooltip}
                  onMouseLeave={toggleTooltip} >
                      <img 
                      id={`img${jam.id}`}
                      src= {jam.imageUrl} 
                      alt = {jam.jamName}
                      className = "jam-img"
                      style={{width : '400px', height : "200px", margin : '20px'}}
                      />
                        <Tooltip
                            placement="right"
                            isOpen={tooltipOpen}
                            target={`img${jam.id}`}
                            toggle={toggleTooltip}
                            style={toolTipStyle}
                          >
                        {jam.jamDescription}
                        </Tooltip>
                </div>
                        <p>Venue Name : {jam.venueName}</p>
                        <p>Area Of Town : {jam.areaOfTown?.name}</p>
                        <p>Address : {jam.address}</p>
            
            </div>
          </div>
      </CardBody>
      
  
    </Card>
 
    
  );
};

export default FilteredJam;