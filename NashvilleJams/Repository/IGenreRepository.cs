using System.Collections.Generic;
using Azure;
using NashvilleJams.Model;

namespace NashvilleJams.Repository
{
    public interface IGenreRepository
    {
        public List<Genre> GetAllGenres();
        public Genre GetGenreById(int id);
        public void AddGenre(Genre genre);
        public void UpdateGenre(Genre genre);
        public void DeleteGenre(int id);
    }
}
