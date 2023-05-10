import React, { useEffect, useState } from "react";
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
      <div className="container text-center">
        <div className="d-flex flex-wrap justify-content-between mb-2">
          {userProfiles.map((user) => (
            <UserProfileCard
              key={user.id}
              user={user}
              style={{ width: "500px" }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfiles;

//yo
