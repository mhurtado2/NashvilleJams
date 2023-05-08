import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, FormText, Tooltip } from 'reactstrap';
import { getAllGenres, getGenreById, updateGenre } from '../modules/genreManager';



const GenreFormEdit = ({ getGenre }) => {
 
//get genres
  const [genres, setGenres] = useState([]);

//get genre by id 
  const [genre, setGenre] = useState([]);
  const { id } = useParams();
  const [selectedGenre, setSelectedGenre] = useState(null);

//toggle edit form
  const [editFormOpen, setEditFormOpen] = useState(false);

  const toggleEditForm = () => {
    setEditFormOpen(!editFormOpen);
  }

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

    updateGenre(selectedGenre).then((p) => {
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
            <select id="genreId" className="form-control text-center form-control-sm" value={selectedGenre?.Id} onChange={handleInputChange} style={{ width : "60%", margin : "16px 16px 16px 400px" }}>
            <option value="">-- Select Genre --</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            ))}
            </select>

        </React.Fragment>
      </FormGroup>
      <Button className="btn btn-dark m-4" onClick={toggleEditForm}>{editFormOpen ? 'Hide Edit Form' : 'Edit Genre'}</Button>
      {editFormOpen && selectedGenre && (
        <Form>
     
        <Label for="Name" style={{ fontWeight: "bold" }} >Genre Name</Label>
        <textarea type="text" name="Name" id="Name" className='form-control'
          value={selectedGenre.Name}    

        onChange={(e) => 
            setSelectedGenre({ ...selectedGenre, name: e.target.value})}
          style={{width : "60%", margin : "16px 16px 16px 400px"}}
          />     

      <Button className="btn btn-success m-4" onClick={handleSave}>Save</Button>
        </Form>
      )}
     
    </Form>

</>
  );
};

export default GenreFormEdit;