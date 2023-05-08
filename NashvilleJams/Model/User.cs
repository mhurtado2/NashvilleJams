using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace NashvilleJams.Model
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string FireBaseUserId { get; set; }
        public int UserTypeId { get; set; } 
        public UserType UserType { get; set; }
        public UserGenre UserGenre { get; set; }
        public List<Genre> Genres { get; set; }
        public Genre Genre { get; set; }
    }
}
