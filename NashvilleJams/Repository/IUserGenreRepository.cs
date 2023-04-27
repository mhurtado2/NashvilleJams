using NashvilleJams.Model;
using System.Collections.Generic;

namespace NashvilleJams.Repository
{
    public interface IUserGenreRepository
    {
        public List<UserGenre> GetAllUserGenres();
    }
}
