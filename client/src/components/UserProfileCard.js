import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";



const UserProfileCard = ({ user }) => {

  return (
    <Card className="mt-1">
      <CardBody key={user.id} className="border">
        <>
            <div>
                {user.fullName}
            </div>

            <div>
                {user.email}
            </div> 

            <div>
                {user.genres && 
                    Array.from(new Set(user.genres.map((genre) => genre.name))).map((name) => (
                        <div key={name}>{name}</div>
                    ))}
           </div>

        </> 
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;