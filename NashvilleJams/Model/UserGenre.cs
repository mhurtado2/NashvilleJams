using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace NashvilleJams.Model
{
    public class UserGenre
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}
