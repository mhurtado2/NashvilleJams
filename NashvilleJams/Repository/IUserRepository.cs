using NashvilleJams.Model;
using System.Collections.Generic;

namespace NashvilleJams.Repository
{
    public interface IUserRepository
    {
        public List<User> GetAllUsers();
        //public User GetUserById(int id);
        public User GetByFirebaseUserId(string firebaseUserId);
        public void Add(User user);
        public void DeleteUser(int id);
    }
}
