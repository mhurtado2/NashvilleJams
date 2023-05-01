import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteJam, getAllJams } from "../modules/jamManager";
import Jam from "./Jam";


const JazzJam = () => {
  const [jams, setJams] = useState([]);
const navigate = useNavigate();

//make a new function in auth manager
    const getJams = () => {
    getAllJams().then(jams => {
        const filteredJams = jams.filter(jam => jam.genreId === 3)
        setJams(filteredJams)});
  };


  useEffect(() => {
    getJams();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 


  return (
    <div className="container">

      <div className="row justify-content-center">
        {jams.map((jam) => (
            <React.Fragment key={jam.id}>
          <Jam jam={jam} />
          <Button className="editBtn" onClick={() => navigate(`${jam.id}`)}>Edit</Button>
          <Button className="deleteBtn" onClick={ ()=> deleteJam(`${jam.id}`)}>Delete</Button>
          </React.Fragment>
        ))}
      </div>
      {/* <Button onClick={() => navigate("add")}> Create a New Tag!</Button> */}
    </div>
  );
};

export default JazzJam;