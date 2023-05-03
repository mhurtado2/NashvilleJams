using System.Collections.Generic;
using Azure;
using NashvilleJams.Model;


namespace NashvilleJams.Repository
{
    public interface IJamRepository
    {
        public List<Jam> GetAllJams();
        public Jam GetJamById(int id);
        public void AddJam(Jam jam);
        public int GetJamCount();
        public void UpdateJam(Jam jam);
        public void DeleteJam(int id);
        public List<Jam> Search(string criterion, bool sortDescending);
    }
}
