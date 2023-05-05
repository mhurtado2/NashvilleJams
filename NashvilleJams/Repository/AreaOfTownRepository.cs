using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using System.Collections.Generic;
using NashvilleJams.Utils;
using Azure;
using Microsoft.Data.SqlClient;

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

        public AreaOfTown GetAreaById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Id, Name
                             FROM AreaOfTown
                              WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {



                        if (reader.Read())
                        {
                            AreaOfTown area = new AreaOfTown
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            };
                            return area;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }

            }
        }
        public void AddArea(AreaOfTown areaOfTown)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO AreaOfTown (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", areaOfTown.Name);

                    areaOfTown.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateArea(AreaOfTown areaOfTown)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE AreaOfTown
                            SET 
                            Name = @name
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", areaOfTown.Id);
                    cmd.Parameters.AddWithValue("@name", areaOfTown.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
