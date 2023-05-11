import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Tooltip } from "reactstrap";
import { getAllAreas } from "../modules/areaManager";
import { getAllGenres } from "../modules/genreManager";
import { addJam } from "../modules/jamManager";

const JamForm = () => {
  const emptyJam = {
    jamName: "",
    venueName: "",
    address: "",
    imageUrl: "",
    genreId: 0,
    areaOfTownId: 0,
    jamDescription: "",
  };

  const [jam, setJam] = useState(emptyJam);
  const [genres, setGenres] = useState([]);
  const [areas, setAreas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllAreas().then(setAreas);
    getAllGenres().then(setGenres);
  }, []);

  const handleInputChange = (evt) => {
    const value = evt.target.value;

    const key = evt.target.id;

    const jamCopy = { ...jam };

    jamCopy[key] = value;

    setJam(jamCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addJam(jam).then((p) => {
      // Navigate the user back to the home route
      navigate("/");
    });
  };

  const [genreTooltipOpen, setGenreTooltipOpen] = useState(false);
  const [areaTooltipOpen, setAreaTooltipOpen] = useState(false);

  const toggleGenreTooltip = () => {
    setGenreTooltipOpen(!genreTooltipOpen);
  };

  const toggleAreaTooltip = () => {
    setAreaTooltipOpen(!areaTooltipOpen);
  };

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
            border: "2px solid black",
          }}
        >
          <React.Fragment>
            <Label for="jamName" style={{ fontWeight: "bold" }}>
              Jam Name
            </Label>
            <textarea
              type="text"
              name="jamName"
              id="jamName"
              className="form-control"
              value={jam.jamName}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
            />

            <Label for="venueName" style={{ fontWeight: "bold" }}>
              Venue Name
            </Label>
            <textarea
              type="text"
              name="venueName"
              id="venueName"
              className="form-control"
              value={jam.venueName}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
            />

            <Label for="address" style={{ fontWeight: "bold" }}>
              Address
            </Label>
            <textarea
              type="text"
              name="address"
              id="address"
              className="form-control"
              value={jam.address}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
            />

            <Label for="imageUrl" style={{ fontWeight: "bold" }}>
              Image
            </Label>
            <textarea
              type="text"
              name="imageUrl"
              id="imageUrl"
              className="form-control"
              value={jam.imageUrl}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
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
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
            />

            <Label
              for="genreId"
              style={{ fontWeight: "bold", marginLeft: "30px" }}
            >
              Genre
            </Label>
            <span id="addGenreTooltip">
              <Button
                className="btn btn-info m-4"
                onClick={() => navigate("/addGenre")}
              >
                Add Genre
              </Button>
            </span>
            <Tooltip
              placement="right"
              isOpen={genreTooltipOpen}
              target="addGenreTooltip"
              toggle={toggleGenreTooltip}
            >
              Don't see the Genre for your Jam? Add a new Genre!
            </Tooltip>

            <select
              id="genreId"
              className="form-control text-center form-control-sm"
              value={jam.genreId}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
            >
              <option value="">-- Select Genre --</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <Label
              for="areaOfTownId"
              style={{ fontWeight: "bold", marginLeft: "30px" }}
            >
              Area Of Town
            </Label>
            <span id="addAreaTooltip">
              <Button
                className="btn btn-info m-4"
                onClick={() => navigate("/addArea")}
              >
                Add Area
              </Button>
            </span>

            <Tooltip
              placement="right"
              isOpen={areaTooltipOpen}
              target="addAreaTooltip"
              toggle={toggleAreaTooltip}
            >
              Don't see the Area Of Town for your Jam? Add a new Area Of Town!
            </Tooltip>

            <select
              id="areaOfTownId"
              className="form-control form-control-sm text-center"
              value={jam.areaOfTownId}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 200px" }}
            >
              <option value="">-- Select Area Of Town --</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </React.Fragment>
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

export default JamForm;
