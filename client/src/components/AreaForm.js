import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText } from 'reactstrap';
import { addArea } from '../modules/areaManager';



const AreaForm = ({ getArea }) => {
  const emptyArea = {
    Name: '',
  };

  const [area, setArea] = useState(emptyArea);
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


  return (
<Form >
      <FormGroup > 
        <React.Fragment >
        <Label for="Name">Area Of Town</Label>
        <textarea type="text" name="Name" id="Name" className='form-control'
          value={area.Name}    
          onChange={handleInputChange} 
          style={{width : "80%", margin : "16px 16px 16px 175px"}}
          />     

        </React.Fragment>
      </FormGroup>
      <Button className="btn btn-success m-4" onClick={handleSave}>Save</Button>
      <Button className="btn btn-secondary m-4" onClick={() => navigate("/add")}>Cancel</Button>
    </Form>
  );
};

export default AreaForm;