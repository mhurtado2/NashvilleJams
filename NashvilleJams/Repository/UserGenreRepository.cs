﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using NashvilleJams.Utils;
using System.Collections.Generic;

namespace NashvilleJams.Repository
{
    public class UserGenreRepository: BaseRepository, IUserGenreRepository
    {

        public UserGenreRepository(IConfiguration config) : base(config) { }

        public List<UserGenre> GetAllUserGenres()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserId, GenreId
                       FROM UserGenre";
                    var reader = cmd.ExecuteReader();

                    var userGenres = new List<UserGenre>();

                    while (reader.Read())
                    {
                        userGenres.Add(new UserGenre()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GenreId = DbUtils.GetInt(reader, "GenreId")
                        });
                    }

                    reader.Close();

                    return userGenres;
                }
            }
        }

        public UserGenre GetUserGenreById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT Id, UserId, GenreId
                            FROM UserGenre
                              WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {



                        if (reader.Read())
                        {
                            UserGenre userGenre = new UserGenre
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                GenreId = DbUtils.GetInt(reader, "GenreId")
                            };
                            return userGenre;
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
