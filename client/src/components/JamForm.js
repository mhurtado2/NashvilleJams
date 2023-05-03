import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText } from 'reactstrap';
import { getAllAreas } from '../modules/areaManager';
import { me } from '../modules/authManager';
import { getAllGenres } from '../modules/genreManager';
import { addJam } from '../modules/jamManager';
import { addUserGenre, getUserGenres } from '../modules/userGenreManager';



const JamForm = ({ getJam }) => {
  const emptyJam = {
    jamName: '',
    venueName: '',
    address: '',
    imageUrl: '',
    genreId: 0,
    areaOfTownId:0
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


  return (
<Form >
      <FormGroup > 
        <React.Fragment >
        <Label for="jamName">Jam Name</Label>
        <textarea type="text" name="jamName" id="jamName" className='form-control'
          value={jam.jamName}    
          onChange={handleInputChange} 
          style={{width : "80%", margin : "16px 16px 16px 175px"}}
          />     

        <Label for="venueName">Venue Name</Label>
        <textarea type="text" name="venueName" id="venueName" className='form-control'
          value={jam.venueName}
          onChange={handleInputChange}
          style={{width : "80%", margin : "16px 16px 16px 175px"}} 
          />   

        <Label for="address">Address</Label>
        <textarea type="text" name="address" id="address" className='form-control'
          value={jam.address}
          onChange={handleInputChange}
          style={{width : "80%", margin : "16px 16px 16px 175px"}}
           />

         <Label for="imageUrl">Image</Label>
        <textarea type="text" name="imageUrl" id="imageUrl" className='form-control'
          value={jam.imageUrl}
          onChange={handleInputChange} 
          style={{width : "80%", margin : "16px 16px 16px 175px"}}
          /> 


<Label for ="genreId">Genre</Label>
<select id="genreId" className="form-control text-center form-control-sm" value={jam.genreId} onChange={handleInputChange} style={{width : "80%", margin : "16px 16px 16px 175px" }}>
<option value="">-- Select Genre --</option>
{genres.map((genre) => (
    <option key={genre.id} value={genre.id}>
        {genre.name}
    </option>
))}
</select>


<Label for ="areaOfTownId">Area Of Town</Label>
<select id="areaOfTownId" className="form-control form-control-sm text-center" value={jam.areaOfTownId} onChange={handleInputChange} style={{width : "80%", margin : "16px 16px 16px 175px" }}>
<option value="">-- Select Area Of Town --</option>
{areas.map((area) => (
    <option key={area.id} value={area.id}>
        {area.name}
    </option>
))}
</select>

        </React.Fragment>
      </FormGroup>
      <Button className="btn btn-success m-4" onClick={handleSave}>Save</Button>
      <Button className="btn btn-secondary m-4" onClick={() => navigate("/")}>Cancel</Button>
    </Form>
  );
};

export default JamForm;