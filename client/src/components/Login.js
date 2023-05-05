import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";


export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <>
        <div>  
        <h2 className="mb-6">Welcome To Nashville Jams!</h2>
        </div>

        <Container 
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
        >
        
        <Form 
          onSubmit={loginSubmit}
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
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            autoFocus
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
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </Container>
    </>
  );
}

//ypo