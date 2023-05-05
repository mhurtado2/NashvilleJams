using System.Collections.Generic;
using Azure;
using NashvilleJams.Model;


namespace NashvilleJams.Repository
{
    public interface IAreaOfTownRepository
    {
        public List<AreaOfTown> GetAllAreas();
        public AreaOfTown GetAreaById(int id);
        public void AddArea(AreaOfTown areaOfTown);

        public void UpdateArea(AreaOfTown areaOfTown);

    }
}
