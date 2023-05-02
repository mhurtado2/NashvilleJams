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
    <Card className="mt-1 shadow">
      <CardBody key={user.id} className="border">
        <>
            <h2>
                {user.fullName}
            </h2>

            <img 
            src= "https://th.bing.com/th/id/OIP.MefRqJY_zYzMN2iNcj4HzgHaHa?w=212&h=213&c=7&r=0&o=5&pid=1.7"
            alt = "Avatar"
            className = "jam-img rounded-circle"
            style={{width : '80px'}}
            />


            <h5>
                {user.email}
            </h5> 

            <div>
                {user.genres && 
                    Array.from(new Set(user.genres.map((genre) => genre.name))).map((name) => (
                        <li key={name}>{name}</li>
                    ))}
           </div>

        </> 
      </CardBody>
    </Card>
  );
};

export default UserProfileCard;