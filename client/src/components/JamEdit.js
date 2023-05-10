import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { getAllAreas } from "../modules/areaManager";
import { getAllGenres } from "../modules/genreManager";
import { getJamById, updateJam } from "../modules/jamManager";

const JamEdit = () => {
  const [jam, setJam] = useState();

  const [genres, setGenres] = useState([]);
  const [areas, setAreas] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getJamById(id).then(setJam);
  }, []);

  useEffect(() => {
    getAllAreas().then(setAreas);
    getAllGenres().then(setGenres);
    getJamById(id).then(setJam);
  }, []);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const checked = evt.target.checked;
    const key = evt.target.id;

    const jamCopy = { ...jam };

    if (evt.target.type === "checkbox") {
      jamCopy[key] = checked ? parseInt(value) : null;
    } else {
      jamCopy[key] = value;
    }

    setJam(jamCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    updateJam(jam).then((p) => {
      // Navigate the user back to the home route
      navigate("/");
    });
  };

  if (!jam) {
    return null;
  }

  return (
    <Form>
      <div style={{ textAlign: "center" }}>
        <FormGroup
          style={{
            backgroundColor: "rgba(173, 165, 169, 0.8)",
            padding: "1rem",
            borderRadius: "1rem",
            width: "60%",
            height: "50%",
            margin: "0 auto",
            //zombie alert
            // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
            border: "2px solid black",
          }}
        >
          <Label for="jamName" style={{ fontWeight: "bold" }}>
            Jam Name
          </Label>
          <textarea
            type="text"
            name="jamName"
            id="jamName"
            className="form-control text-center"
            value={jam.jamName}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          />

          <Label for="venueName" style={{ fontWeight: "bold" }}>
            Venue Name
          </Label>
          <textarea
            type="text"
            name="venueName"
            id="venueName"
            className="form-control text-center"
            value={jam.venueName}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          />

          <Label for="address" style={{ fontWeight: "bold" }}>
            Address
          </Label>
          <textarea
            type="text"
            name="address"
            id="address"
            className="form-control text-center"
            value={jam.address}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          />

          <Label for="imageUrl" style={{ fontWeight: "bold" }}>
            Image
          </Label>
          <textarea
            type="text"
            name="imageUrl"
            id="imageUrl"
            className="form-control text-center"
            value={jam.imageUrl}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          />

          <Label for="jamDescription" style={{ fontWeight: "bold" }}>
            Description
          </Label>
          <textarea
            type="text"
            name="jamDescription"
            id="jamDescription"
            className="form-control"
            value={jam.jamDescription}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          />

          <Label for="genreId" style={{ fontWeight: "bold" }}>
            Genre
          </Label>
          <select
            id="genreId"
            className="form-control text-center"
            value={jam.genreId}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          >
            <option value="">-- Select Genre --</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <Label for="areaOfTownId" style={{ fontWeight: "bold" }}>
            Area Of Town
          </Label>
          <select
            id="areaOfTownId"
            className="form-control text-center"
            value={jam.areaOfTownId}
            onChange={handleInputChange}
            style={{ width: "60%", margin: "16px 16px 16px 250px" }}
          >
            <option value="">-- Select Area Of Town --</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <Button className="btn btn-success m-4" onClick={handleSave}>
        Save
      </Button>
      <Button className="btn btn-secondary m-4" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </Form>
  );
};

export default JamEdit;
