import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText, Tooltip } from 'reactstrap';
import { deleteGenre, getAllGenres, getGenreById, updateGenre } from '../modules/genreManager';



const GenreDelete = ({ getGenre }) => {
 
//get genres
  const [genres, setGenres] = useState([]);

//get genre by id 
  const [genre, setGenre] = useState([]);
  const { id } = useParams();
  const [selectedGenre, setSelectedGenre] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    getAllGenres().then(setGenres);
    getGenreById(id).then(setGenre);
}, []);


  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const selected = genres.find((genre) => genre.id === parseInt(value));
    setSelectedGenre(selected);
  };


  const handleSave = (evt) => {
    evt.preventDefault();

    deleteGenre(selectedGenre.id).then((p) => {
        // Navigate the user back to the home route
        navigate("/addGenre");
        window.location.reload();
    });
  };


  return (
<>
   <Form >
      <FormGroup > 
        <React.Fragment >

            <Label for ="genreId" style={{ fontWeight: "bold" }} >Genre</Label>  
            <select id="genreId" className="form-control text-center form-control-sm" value={selectedGenre?.Id} onChange={handleInputChange} style={{width : "80%", margin : "16px 16px 16px 175px" }}>
            <option value="">-- Select Genre --</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
            </select>

        </React.Fragment>
      </FormGroup>
      <Button className="btn btn-danger m-4" onClick={handleSave}>Delete</Button>
     
    </Form>

</>
  );
};

export default GenreDelete;