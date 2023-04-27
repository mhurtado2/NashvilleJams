using System.Collections.Generic;
using Azure;
using NashvilleJams.Model;


namespace NashvilleJams.Repository
{
    public interface IJamRepository
    {
        public List<Jam> GetAllJams();
    }
}
