import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { me } from "../modules/authManager";
import { addGenre } from "../modules/genreManager";
import GenreDelete from "./GenreDelete";
import GenreFormEdit from "./GenreFormEdit";

const GenreForm = () => {
  const emptyGenre = {
    Name: "",
  };

  const [genre, setGenre] = useState(emptyGenre);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleInputChange = (evt) => {
    const value = evt.target.value;

    const key = evt.target.id;

    const genreCopy = { ...genre };

    genreCopy[key] = value;

    setGenre(genreCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addGenre(genre).then((p) => {
      // Navigate the user back to the home route
      navigate("/add");
    });
  };

  useEffect(() => {
    me().then(setUser);
  }, []);

  return (
    <React.Fragment
      style={{
        backgroundColor: "rgba(173, 165, 169, 0.8)",
        padding: "1rem",
        borderRadius: "1rem",
        width: "60%",
        height: "50%",
        margin: "0 auto",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Form>
        <FormGroup>
          <React.Fragment>
            <h2>Add A Genre</h2>
            <Label for="Name" style={{ fontWeight: "bold" }}>
              Genre Name
            </Label>
            <textarea
              type="text"
              name="Name"
              id="Name"
              className="form-control"
              value={genre.Name}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 350px" }}
            />
          </React.Fragment>
        </FormGroup>
        <Button className="btn btn-success m-4" onClick={handleSave}>
          Save
        </Button>
        <Button
          className="btn btn-secondary m-4"
          onClick={() => navigate("/add")}
        >
          Cancel
        </Button>
      </Form>
      {user.userTypeId === 1 ? (
        <>
          <h2>Edit A Genre</h2>
          <GenreFormEdit />
          <h2>Delete A Genre</h2>
          <GenreDelete />{" "}
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default GenreForm;
