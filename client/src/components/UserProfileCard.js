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
        <div>
          {user.fullName}
        </div>
        <div>{user.email}</div>  
        <div>{user.Genre?.map()}</div>  
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;