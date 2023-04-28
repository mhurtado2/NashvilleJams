
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
                    u.Id as UserID, u.FullName, u.Email, u.FireBaseUserID
                       
                       FROM Jam j
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
                              SELECT Id, JamName, VenueName, ImageUrl, Address, GenreId, UserId, AreaOfTownId
                              FROM Jam
                              WHERE id = @id";

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
                        INSERT INTO Jam (JamName, VenueName, ImageUrl, Address, GenreId, UserId, AreaOfTownId)
                        OUTPUT INSERTED.ID
                        VALUES (@JamName, @VenueName, @ImageUrl, @Address, @GenreId, @UserId, @AreaOfTownId)";

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
                            UserId = @userId,
                            AreaOfTownId = @areaOfTownId
                            WHERE Id = @id" ;

                    DbUtils.AddParameter(cmd, "@id", jam.Id);
                    cmd.Parameters.AddWithValue("@jamName", jam.JamName);
                    cmd.Parameters.AddWithValue("@venueName", jam.VenueName);
                    cmd.Parameters.AddWithValue("@imageUrl", jam.ImageUrl);
                    cmd.Parameters.AddWithValue("@address", jam.Address);
                    cmd.Parameters.AddWithValue("@genreId", jam.GenreId);
                    cmd.Parameters.AddWithValue("@userId", jam.UserId);
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
