﻿
using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using System.Collections.Generic;
using NashvilleJams.Utils;
using Microsoft.Data.SqlClient;


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
                    cmd.CommandText = @"SELECT Id, JamName, VenueName, ImageUrl, Address, GenreId, UserId, AreaOfTownId
                       FROM Jam";
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


    }
}
