import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { getAllAreas } from '../modules/areaManager';
import { getAllGenres } from '../modules/genreManager';
import { getJamById, updateJam } from '../modules/jamManager';


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
      <FormGroup>
        <Label for="jamName">Jam Name</Label>
        <textarea type="text" name="jamName" id="jamName" className='form-control text-center'
          value={jam.jamName}
          onChange={handleInputChange} />     

        <Label for="venueName">Venue Name</Label>
        <textarea type="text" name="venueName" id="venueName" className='form-control text-center'
          value={jam.venueName}
          onChange={handleInputChange} />   

        <Label for="address">Address</Label>
        <textarea type="text" name="address" id="address" className='form-control text-center'
          value={jam.address}
          onChange={handleInputChange} />

         <Label for="imageUrl">Image</Label>
        <textarea type="text" name="imageUrl" id="imageUrl" className='form-control text-center'
          value={jam.imageUrl}
          onChange={handleInputChange} /> 


<Label for ="genreId">Genre</Label>
<select id="genreId" className="form-control text-center" value={jam.genreId} onChange={handleInputChange}>
<option value="">-- Select Genre --</option>
{genres.map((genre) => (
    <option key={genre.id} value={genre.id}>
        {genre.name}
    </option>
))}
</select>


<Label for ="areaOfTownId">Area Of Town</Label>
<select id="areaOfTownId" className="form-control text-center" value={jam.areaOfTownId} onChange={handleInputChange}>
<option value="">-- Select Area Of Town --</option>
{areas.map((area) => (
    <option key={area.id} value={area.id}>
        {area.name}
    </option>
))}
</select>

        
      </FormGroup>
      <Button className="btn btn-success m-4" onClick={handleSave}>Save</Button>
      <Button className="btn btn-secondary m-4" onClick={() => navigate("/")}>Cancel</Button>
    </Form>
  );
};

export default JamEdit;