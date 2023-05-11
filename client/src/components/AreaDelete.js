import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { deleteArea, getAllAreas, getAreaById } from "../modules/areaManager";

const AreaDelete = () => {
  //get areas
  const [areas, setAreas] = useState([]);

  //get area by id
  const [area, setArea] = useState([]);
  const { id } = useParams();
  const [selectedArea, setSelectedArea] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllAreas().then(setAreas);
    getAreaById(id).then(setArea);
  }, []);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const selected = areas.find((area) => area.id === parseInt(value));
    setSelectedArea(selected);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    deleteArea(selectedArea.id).then((p) => {
      // Navigate the user back to the home route
      navigate("/addArea");
      window.location.reload();
    });
  };

  return (
    <>
      <Form>
        <FormGroup>
          <React.Fragment>
            <Label for="areaId" style={{ fontWeight: "bold" }}>
              Area
            </Label>
            <select
              id="areaId"
              className="form-control text-center form-control-sm"
              value={selectedArea?.Id}
              onChange={handleInputChange}
              style={{ width: "60%", margin: "16px 16px 16px 400px" }}
            >
              <option value="">-- Select Area --</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </React.Fragment>
        </FormGroup>
        <Button className="btn btn-danger m-4" onClick={handleSave}>
          Delete
        </Button>
      </Form>
    </>
  );
};

export default AreaDelete;
