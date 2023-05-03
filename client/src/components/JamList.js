import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteJam, getAllJams, getJamCount } from "../modules/jamManager";
import Jam from "./Jam";
import JamSearch from "./JamSearch";



const JamList = () => {
  const [jams, setJams] = useState([]);
  const [jamCount, setJamCount] = useState({count : 0});

//make a new function in auth manager
    const getJams = () => {
    getAllJams().then(jams => setJams(jams));
  };

  const getJamsInNash = () => {
    getJamCount().then(count => setJamCount({count}))
  }


  useEffect(() => {
    getJams();
    getJamsInNash();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 

  //react component 
  
  return (
    <>
    <div>
        <div className="text-center">
        <h2>Find A Jam!</h2>
        <JamSearch />
        <p className="text-center text-muted">Current Jam Count: {jamCount.count}</p>
        </div>
    </div>

    <div className="container justify-content-between mb-2 ">
      <div className="d-flex flex-wrap justify-content-between shadow" >
        {jams.map((jam) => (
            <React.Fragment key={jam.id}>
          <Jam jam={jam} />         
          </React.Fragment>
        ))}
      </div>
    </div>
    </>
  );
};

export default JamList;