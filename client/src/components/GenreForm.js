import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText } from 'reactstrap';
import { getAllAreas } from '../modules/areaManager';
import { me } from '../modules/authManager';
import { addGenre, getAllGenres } from '../modules/genreManager';
import { addJam } from '../modules/jamManager';
import { addUserGenre, getUserGenres } from '../modules/userGenreManager';
import GenreDelete from './GenreDelete';
import GenreFormEdit from './GenreFormEdit';



const GenreForm = ({ getGenre }) => {
  const emptyGenre = {
    Name: '',
  };

  const [genre, setGenre] = useState(emptyGenre);
  const navigate = useNavigate();


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


  return (
    <>
  <Form >
      <FormGroup > 
        <React.Fragment >
        <Label for="Name" style={{ fontWeight: "bold" }} >Genre Name</Label>
        <textarea type="text" name="Name" id="Name" className='form-control'
          value={genre.Name}    
          onChange={handleInputChange} 
          style={{width : "80%", margin : "16px 16px 16px 175px"}}
          />     

        </React.Fragment>
      </FormGroup>
      <Button className="btn btn-success m-4" onClick={handleSave}>Save</Button>
      <Button className="btn btn-secondary m-4" onClick={() => navigate("/add")}>Cancel</Button>
    </Form>
    <h2>Edit A Genre</h2>
    <GenreFormEdit/>
    <h2>Delete A Genre</h2>
    <GenreDelete />
    </>
  );
};

export default GenreForm;