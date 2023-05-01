import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { deleteJam, getAllJams, getJamById } from "../modules/jamManager";
import Jam from "./Jam";


const JamDetails = () => {
  const [jam, setJam] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
const { id } = useParams();

//make a new function in auth manager
    const getSelectedJam = () => {
    getJamById(id).then(jam => setJam(jam));
  };


  useEffect(() => {
    getSelectedJam();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 

  
  const DeleteJamModal = () => {
    return (
        <Modal isOpen={isOpen}>
            <ModalBody>Are you sure you want to delete this Jam?</ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    className="btn btn-danger m-4"
                    onClick={() => {
                        deleteJam(id);
                        navigate(`/`);
                    }}
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
};

  return (
    <div className="container">

      <div className="row justify-content-center">
          <Jam jam={jam} />
          <Button className="editBtn" onClick={() => navigate(`edit/${jam.id}`)}>Edit</Button> 
          <Button
                    className="btn btn-danger m-4"
                    onClick={() => {
                        
                        setIsOpen(!isOpen);
                        
                    }}
                >
                    Delete Jam
                </Button>
                <DeleteJamModal />
      </div>
    </div>
  );
};

export default JamDetails;