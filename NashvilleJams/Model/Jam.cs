using System;
using System.Collections.Generic;
using System.ComponentModel;


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
    }
}
