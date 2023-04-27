using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using System.Collections.Generic;
using NashvilleJams.Utils;

namespace NashvilleJams.Repository
{
    public class AreaOfTownRepository: BaseRepository, IAreaOfTownRepository
    {
        public AreaOfTownRepository(IConfiguration config) : base(config) { }

        public List<AreaOfTown> GetAllAreas()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                       FROM AreaOfTown";
                    var reader = cmd.ExecuteReader();

                    var areas = new List<AreaOfTown>();

                    while (reader.Read())
                    {
                        areas.Add(new AreaOfTown()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return areas;
                }
            }
        }
    }
}
