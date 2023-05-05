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
    <div className="container d-flex justify-content-between" >

      {userProfiles.map((user) => (
        <UserProfileCard key={user.id} user={user} style={{width: "500px"}}/>
      ))}
    </div>
  );
};

export default UserProfiles;