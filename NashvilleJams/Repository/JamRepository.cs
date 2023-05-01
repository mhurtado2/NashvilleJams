
using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using System.Collections.Generic;
using NashvilleJams.Utils;
using Microsoft.Data.SqlClient;
using Azure;
using Microsoft.Extensions.Hosting;


namespace NashvilleJams.Repository
{
    public class JamRepository : BaseRepository, IJamRepository
    {
        public JamRepository(IConfiguration config) : base(config) { }

        public List<Jam> GetAllJams()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id, j.JamName, j.VenueName, j.ImageUrl, j.Address, j.GenreId, j.UserId, j.AreaOfTownId,
                    u.Id as UserID, u.FullName, u.Email, u.FireBaseUserID, a.Name as AreaName
                       
                       FROM Jam j
                       LEFT JOIN AreaOfTown a on a.Id = j.AreaOfTownId
                       LEFT JOIN [User] u on u.Id = j.UserId";
                    var reader = cmd.ExecuteReader();

                    var jams = new List<Jam>();

                    while (reader.Read())
                    {
                        jams.Add(new Jam()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            JamName = DbUtils.GetString(reader, "JamName"),
                            VenueName = DbUtils.GetString(reader, "VenueName"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            Address = DbUtils.GetString(reader, "Address"),
                            GenreId = DbUtils.GetInt(reader, "GenreId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            AreaOfTownId = DbUtils.GetInt(reader, "AreaOfTownId"),
                            User = new User
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            },
                            AreaOfTown = new AreaOfTown
                            {
                                Name = DbUtils.GetString(reader, "AreaName"),
                            }
                        });
                    }

                    reader.Close();

                    return jams;
                }
            }
        }

        public Jam GetJamById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT j.Id, j.JamName, j.VenueName, j.ImageUrl, j.Address, j.GenreId, j.UserId, j.AreaOfTownId, g.id AS GenreId, 
                              g.Name AS GenreName, a.Id AS AreaId, a.Name AS AreaName
                              FROM Jam j
                              LEFT JOIN Genre g on g.Id = j.GenreId
                              LEFT JOIN AreaOfTown a on a.Id = j.AreaOfTownId
                              WHERE j.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        if (reader.Read())
                        {
                            Jam jam = new Jam
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                JamName = DbUtils.GetString(reader, "JamName"),
                                VenueName = DbUtils.GetString(reader, "VenueName"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                Address = DbUtils.GetString(reader, "Address"),
                                GenreId = DbUtils.GetInt(reader, "GenreId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                AreaOfTownId = DbUtils.GetInt(reader, "AreaOfTownId"),
                                Genre = new Genre
                                {
                                    Id = DbUtils.GetInt(reader, "GenreId"),
                                    Name = DbUtils.GetString(reader, "GenreName"),
                                },
                                AreaOfTown = new AreaOfTown
                                {
                                    Id = DbUtils.GetInt(reader, "AreaId"),
                                    Name = DbUtils.GetString(reader, "AreaName"),
                                }

                            };
                            return jam;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }

            }
        }


        public void AddJam(Jam jam)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Jam (JamName, VenueName, ImageUrl, Address, UserId, GenreId, AreaOfTownId)
                        OUTPUT INSERTED.ID
                        VALUES (@JamName, @VenueName, @ImageUrl, @Address, @UserId, @GenreId, @AreaOfTownId)";

                    DbUtils.AddParameter(cmd, "@JamName", jam.JamName);
                    DbUtils.AddParameter(cmd, "@VenueName", jam.VenueName);
                    DbUtils.AddParameter(cmd, "@ImageUrl", jam.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Address", jam.Address);
                    DbUtils.AddParameter(cmd, "@GenreId", jam.GenreId);
                    DbUtils.AddParameter(cmd, "@UserId", jam.UserId);
                    DbUtils.AddParameter(cmd, "@AreaOfTownId", jam.AreaOfTownId);

                    jam.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public int GetJamCount()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT COUNT(*) as JamsInNashville
                            FROM Jam
                              ";

                    var reader = cmd.ExecuteReader();
                    int count = 0;

                    if (reader.Read())
                    {
                        count = reader.GetInt32(reader.GetOrdinal("JamsInNashville"));
                    }

                    return count;
                }
            }
        }

        public void UpdateJam(Jam jam)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Jam
                            SET 
                            JamName = @jamName,
                            VenueName = @venueName,
                            ImageUrl = @imageUrl,
                            Address = @address,
                            GenreId = @genreId,
                            AreaOfTownId = @areaOfTownId
                            WHERE Id = @id" ;

                    DbUtils.AddParameter(cmd, "@id", jam.Id);
                    cmd.Parameters.AddWithValue("@jamName", jam.JamName);
                    cmd.Parameters.AddWithValue("@venueName", jam.VenueName);
                    cmd.Parameters.AddWithValue("@imageUrl", jam.ImageUrl);
                    cmd.Parameters.AddWithValue("@address", jam.Address);
                    cmd.Parameters.AddWithValue("@genreId", jam.GenreId);
                    cmd.Parameters.AddWithValue("@areaOfTownId", jam.AreaOfTownId);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteJam(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Jam WHERE Id = @id;";
                                       

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
