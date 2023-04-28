import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { getJamById } from '../modules/jamManager';



const JamEdit = () => {

  const [jam, setJam] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getJamById(id).then(setJam);
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

    updateJam(jam).then((p) => {
        // Navigate the user back to the home route
        navigate("/jam");
    });
  };

  if (!jam) {
    return null;
  }

  return (
    <Form>
      <FormGroup>
        <Label for="name">Jam Name</Label>
        <textarea type="text" name="name" id="name" className='form-control'
          value={jam.jamName}
          onChange={handleInputChange} />     
        <Label for="name">Venue Name</Label>
        <textarea type="text" name="name" id="name" className='form-control'
          value={jam.venueName}
          onChange={handleInputChange} />    
         <Label for="name">Image</Label>
        <textarea type="text" name="name" id="name" className='form-control'
          value={jam.iamgeURL}
          onChange={handleInputChange} /> 

          <Label for="name">Genre</Label>
          //make into radio
        <textarea type="text" name="name" id="name" className='form-control'
          value={jam.iamgeURL}
          onChange={handleInputChange} />  

         <Label for="name">Area Of Town</Label>
          //make into radio
        <textarea type="text" name="name" id="name" className='form-control'
          value={jam.iamgeURL}
          onChange={handleInputChange} />
        
      </FormGroup>
      <Button className="btn btn-primary" onClick={handleSave}>Save</Button>
      <Button className="btn btn-primary" onClick={() => navigate("/tag")}>Cancel</Button>
    </Form>
  );
};

export default JamEdit;