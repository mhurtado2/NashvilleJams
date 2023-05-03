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
    <div className="container justify-content-between justify-content-center mr-2">

    <div className="d-flex flex-wrap shadow mr-2"></div>
      {userProfiles.map((user) => (
        <UserProfileCard key={user.id} user={user} style={{margin: '10px 10px 10px 10px'}} />
      ))}
    </div>
  );
};

export default UserProfiles;