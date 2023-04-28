using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Security.Policy;

namespace NashvilleJams.Model
{
    public class Jam
    {
        public int Id { get; set; }
        public string JamName { get; set; }
        public string VenueName { get; set; }
        public string ImageUrl { get; set; }
        public string Address { get; set; }
        public int GenreId { get; set; }
        public int UserId { get; set; }
        public int AreaOfTownId { get; set; }
        public User User { get; set; }
        public Genre Genre { get; set; }
        public AreaOfTown AreaOfTown { get; set; }
    }
}
