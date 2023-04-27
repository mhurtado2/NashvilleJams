using System.Collections.Generic;
using Azure;
using NashvilleJams.Model;

namespace NashvilleJams.Repository
{
    public interface IGenreRepository
    {
        public List<Genre> GetAllGenres();
        public Genre GetGenreById(int id);
    }
}
