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

  //yo

  return (
    <>
          <div className="mb-6 mb-4">  
          <h1 className="mb-6">Welcome To Nashville Jams</h1>
          </div>

          <div className="mb-6 mb-4">  
          <h2 className="mb-6">Login</h2>
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
            backgroundColor: "rgba(173, 165, 169, 0.8)",
            padding: "1rem",
            borderRadius: "1rem",
            width: "60%",
            height: "50%",
            margin: "0 auto",
            // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
          }}
          >

    
      <fieldset>
        <FormGroup className="text-center" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
          <Label for="email" style={{ fontWeight: "bold" }} >Email</Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            style={{width : "50%", marginLeft : "1rem" }}
          />
        </FormGroup>
        <FormGroup className="text-center" style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
          <Label for="password" style={{ fontWeight: "bold" }} >Password</Label>
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