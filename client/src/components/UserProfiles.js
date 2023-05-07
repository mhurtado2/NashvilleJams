import React, { useEffect, useState, useRef } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { getAllUsers } from "../modules/userManager";
import UserProfileCard from "./UserProfileCard";

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  
  useEffect(() => {
    getAllUsers().then((users) => {
      setUserProfiles(users);
    });
  }, []);


  return (
    <>

   <h2>User Profiles</h2>
    <div className="container text-center" >
        <div className="d-flex flex-wrap justify-content-between mb-2">
          {userProfiles.map((user) => (
            <UserProfileCard key={user.id} user={user} style={{width: "500px"}}/>
          ))}
        </div>
    </div>
    
    </>
  );
};

export default UserProfiles;