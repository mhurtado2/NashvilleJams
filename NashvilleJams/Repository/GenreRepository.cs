﻿using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using System.Collections.Generic;
using NashvilleJams.Utils;
using Microsoft.Data.SqlClient;

namespace NashvilleJams.Repository
{
    public class GenreRepository: BaseRepository, IGenreRepository
    {

        public GenreRepository(IConfiguration config) : base(config) { }

        public List<Genre> GetAllGenres()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name
                       FROM Genre";
                    var reader = cmd.ExecuteReader();

                    var genres = new List<Genre>();

                    while (reader.Read())
                    {
                        genres.Add(new Genre()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return genres;
                }
            }
        }

        public Genre GetGenreById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Id, Name
                              FROM Genre
                              WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {



                        if (reader.Read())
                        {
                            Genre genre = new Genre
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            };
                            return genre;
                        }
                        else
                        {
                            return null;
                        }
                    }

                }

            }
        }

        public void AddGenre(Genre genre)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Genre (Name)
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", genre.Name);

                    genre.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateGenre(Genre genre)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Genre
                            SET 
                            Name = @name
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", genre.Id);
                    cmd.Parameters.AddWithValue("@name", genre.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGenre(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Genre WHERE Id = @id;";


                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



    }
}
