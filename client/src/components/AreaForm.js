import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { addArea } from "../modules/areaManager";
import { me } from "../modules/authManager";
import AreaDelete from "./AreaDelete";
import AreaFormEdit from "./AreaFormEdit";

//passed in as prop { getArea }

const AreaForm = () => {
  const emptyArea = {
    Name: "",
  };

  const [area, setArea] = useState(emptyArea);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const value = evt.target.value;

    const key = evt.target.id;

    const areaCopy = { ...area };

    areaCopy[key] = value;

    setArea(areaCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addArea(area).then((p) => {
      // Navigate the user back to the home route
      navigate("/add");
    });
  };

  useEffect(() => {
    me().then(setUser);
  }, []);

  return (
    <>
      <Form>
        <FormGroup>
          <React.Fragment>
            <h2>Add A Area</h2>
            <Label for="Name" style={{ fontWeight: "bold" }}>
              Area Of Town
            </Label>
            <textarea
              type="text"
              name="Name"
              id="Name"
              className="form-control"
              value={area.Name}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 400px" }}
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
          <h2>Edit Area Of Town</h2>
          <AreaFormEdit />

          <h2>Delete Area Of Town</h2>
          <AreaDelete />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AreaForm;
