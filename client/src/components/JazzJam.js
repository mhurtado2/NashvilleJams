import React, { useEffect, useState } from "react";
import { getAllJams } from "../modules/jamManager";
import FilteredJam from "./FilteredJam";

const JazzJam = () => {
  const [jams, setJams] = useState([]);

  //make a new function in auth manager
  const getJams = () => {
    getAllJams().then((jams) => {
      const filteredJams = jams.filter((jam) => jam.genreId === 3);
      setJams(filteredJams);
    });
  };

  useEffect(() => {
    getJams();
  }, []); //only runs on the intial rendering of the page if dependency array is empty

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

export default JazzJam;
