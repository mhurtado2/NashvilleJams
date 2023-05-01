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
    <div className="container">

      <div className="d-flex flex-wrap">
        {jams.map((jam) => (
            <React.Fragment key={jam.id}>
          <Jam jam={jam} />
          {/* <Button className="editBtn" onClick={() => navigate(`${jam.id}`)}>Edit</Button> */}
          {/* <Button className="deleteBtn" onClick={ ()=> deleteJam(`${jam.id}`)}>Delete</Button> */}
          
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JamList;