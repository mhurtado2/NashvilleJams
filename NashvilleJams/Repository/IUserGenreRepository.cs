using NashvilleJams.Model;
using System.Collections.Generic;

namespace NashvilleJams.Repository
{
    public interface IUserGenreRepository
    {
        public List<UserGenre> GetAllUserGenres();
        public UserGenre GetUserGenreById(int id);
        public void DeleteUserGenre(int userGenreId, Genre genre);
        public void AddUserGenre(UserGenre userGenre);
    }
}
