import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { me } from "../modules/authManager";
import { deleteJam, getJamById } from "../modules/jamManager";
import JamDeets from "./JamDeets";


const JamDetails = () => {
const [jam, setJam] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
const { id } = useParams();
const [user, setUser] = useState({});

//make a new function in auth manager
    const getSelectedJam = () => {
    getJamById(id).then(jam => setJam(jam));
  };


  useEffect(() => {
    getSelectedJam();
    me().then(setUser);
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
                    className="btn btn-danger deleteBtn m-4"
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
    <div className="container justify-content-center text-center">

      <div className="row ml-auto justify-content-center">
          <JamDeets jam={jam} />
          {
            jam.userId == user.id ? <> <Button className="btn btn-success m-4" onClick={() => navigate(`edit/${jam.id}`)}>Edit</Button> 
            <Button
            className="btn btn-danger m-4"
            onClick={() => {
                
                setIsOpen(!isOpen);
                
            }}
        >
            Delete Jam
        </Button>
        <DeleteJamModal />
        </>
        : ""
          }
          
      </div>
    </div>
  );
};

export default JamDetails;

