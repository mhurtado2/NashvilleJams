import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteJam, getAllJams } from "../modules/jamManager";
import Jam from "./Jam";


const JamList = () => {
  const [jams, setJams] = useState([]);

//make a new function in auth manager
    const getJams = () => {
    getAllJams().then(jams => setJams(jams));
  };


  useEffect(() => {
    getJams();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 

  
  return (
    <div className="container justify-content-between mb-2 shadow">

      <div className="d-flex flex-wrap justify-content-between" >
        {jams.map((jam) => (
            <React.Fragment key={jam.id}>
          <Jam jam={jam} />         
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JamList;