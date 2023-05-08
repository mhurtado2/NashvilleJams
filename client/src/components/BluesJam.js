import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Tooltip } from "reactstrap";
import { deleteJam, getAllJams } from "../modules/jamManager";
import FilteredJam from "./FilteredJam";



const BluesJam = () => {
  const [jams, setJams] = useState([]);

//make a new function in auth manager
    const getJams = () => {
    getAllJams().then(jams => {
        const filteredJams = jams.filter(jam => jam.genreId === 1)
        setJams(filteredJams)});
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);

const toggleTooltip = () => {
  setTooltipOpen(!tooltipOpen);
};

  useEffect(() => {
    getJams();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 


  return (
    <div className="container">


      <div className="d-flex flex-wrap justify-content-between">
        {jams.map((jam) => (
            <React.Fragment key={jam.id}>
          <FilteredJam jam={jam} />
                {/* <Tooltip
                  placement="right"
                  isOpen={tooltipOpen}
                  target="addTooltip"
                  toggle={toggleTooltip}
                >
                  Don't see the Genre for your Jam? Add a new Genre!
                </Tooltip>
              <span id="addTooltip">{jam.jamDescription}</span> */}
        
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};

export default BluesJam;