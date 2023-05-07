import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteJam, getAllJams } from "../modules/jamManager";
import FilteredJam from "./FilteredJam";



const CountryJam = () => {
  const [jams, setJams] = useState([]);
const navigate = useNavigate();

//make a new function in auth manager
    const getJams = () => {
    getAllJams().then(jams => {
        const filteredJams = jams.filter(jam => jam.genreId === 2)
        setJams(filteredJams)});
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
        
          </React.Fragment>
        ))}
      </div>
    
    </div>
  );
};

export default CountryJam;