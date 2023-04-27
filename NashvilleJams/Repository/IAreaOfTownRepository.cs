using System.Collections.Generic;
using Azure;
using NashvilleJams.Model;


namespace NashvilleJams.Repository
{
    public interface IAreaOfTownRepository
    {
        public List<AreaOfTown> GetAllAreas();
    }
}
