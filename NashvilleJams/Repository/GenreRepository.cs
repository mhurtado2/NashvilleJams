using Microsoft.Extensions.Configuration;
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


    }
}
