import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setfullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // const registerClick = (e) => {
  //   e.preventDefault();
  //   if (password && password !== confirmPassword) {
  //     alert("Passwords don't match. Do better.");
  //   } else {
  //     const userProfile = { fullName, email };
  //     register(userProfile, password)
  //       .then(() => navigate("/"))
  //       //catch is fucked up still
  //       .catch(() => alert("Registration Failed"));
  //   }
  // };

  // The registerClick function is declared as async, which allows you to use the await keyword

  // to wait for the register function to resolve or reject.

  // Inside the try block, the register function is called and awaited.

  // If the register function rejects with an error, the code execution jumps to the catch block.

  // In the catch block, the error is caught, and the alert is displayed to

  // indicate that the registration failed

  // This approach provides a more linear and readable code structure,

  // as the error handling is contained within the try-catch block.

  // It avoids nested callbacks and allows you to handle errors in a more centralized manner

  const registerClick = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      try {
        const userProfile = { fullName, email };
        await register(userProfile, password);
        navigate("/");
      } catch (error) {
        alert("Registration Failed");
      }
    }
  };

  return (
    <>
      <h2 className="mb-4">
        <em>Register</em>
      </h2>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          onSubmit={registerClick}
          style={{
            backgroundColor: "rgba(173, 165, 169, 0.8)",
            padding: "1rem",
            borderRadius: "1rem",
            width: "60%",
            margin: "0 auto",
          }}
        >
          <fieldset>
            <FormGroup
              className="text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Label htmlFor="fullName" style={{ fontWeight: "bold" }}>
                Name
              </Label>
              <Input
                id="fullName"
                type="text"
                autoFocus
                onChange={(e) => setfullName(e.target.value)}
                style={{ width: "50%", marginLeft: "1rem" }}
              />
            </FormGroup>
            <FormGroup
              className="text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Label for="email" style={{ fontWeight: "bold" }}>
                Email
              </Label>
              <Input
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "50%", marginLeft: "1rem" }}
              />
            </FormGroup>
            <FormGroup
              className="text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Label for="password" style={{ fontWeight: "bold" }}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "50%", marginLeft: "1rem" }}
              />
            </FormGroup>
            <FormGroup
              className="text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Label for="confirmPassword" style={{ fontWeight: "bold" }}>
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: "50%", marginLeft: "1rem" }}
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
