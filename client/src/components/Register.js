import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  //change name to fullName
  const [fullName, setfullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { fullName, email };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (

    <>
    <h2>Register</h2>
    <Container 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    }}
    >
    
    <Form 
      onSubmit={registerClick}
      style={{
        backgroundColor: "grey",
        padding: "1rem",
        borderRadius: "1rem",
        width: "60%",
        margin: "0 auto"
      }}
      >
    
      <fieldset>
        <FormGroup className="text-center" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
          <Label htmlFor="fullName">Name</Label>
          <Input
            id="fullName"
            type="text"
            autoFocus
            onChange={(e) => setfullName(e.target.value)}
            style={{width : "50%", marginLeft : "1rem" }}
          />
        </FormGroup>
        <FormGroup className="text-center" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            style={{width : "50%", marginLeft : "1rem" }}
          />
        </FormGroup>
        <FormGroup className="text-center" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{width : "50%", marginLeft : "1rem" }}
          />
        </FormGroup >
        <FormGroup className="text-center" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{width : "50%", marginLeft : "1rem" }}
          />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </Container>
    </>
  );
}