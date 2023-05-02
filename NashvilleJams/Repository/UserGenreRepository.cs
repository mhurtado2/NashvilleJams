using Azure;
using Microsoft.Data.SqlClient;
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
                    cmd.CommandText = @"SELECT ug.Id, ug.UserId, ug.GenreId, g.[Name]
                            FROM UserGenre ug
                            LEFT JOIN Genre g on g.Id = ug.GenreId";
                    var reader = cmd.ExecuteReader();

                    var userGenres = new List<UserGenre>();

                    while (reader.Read())
                    {
                        userGenres.Add(new UserGenre()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            GenreId = DbUtils.GetInt(reader, "GenreId"),
                            Genre = new Genre
                            {
                                Id = DbUtils.GetInt(reader, "GenreId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            },
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
                            SELECT ug.Id, ug.UserId, ug.GenreId, g.[Name]
                            FROM UserGenre ug
                            LEFT JOIN Genre g on g.Id = ug.GenreId
                              WHERE ug.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {



                        if (reader.Read())
                        {
                            UserGenre userGenre = new UserGenre
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                GenreId = DbUtils.GetInt(reader, "GenreId"),
                                Genre = new Genre
                                {
                                    Id = DbUtils.GetInt(reader, "GenreId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                },
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

        public void DeleteUserGenre(int userGenreId, Genre genre)
        {

            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                   DELETE FROM UserGenre
                           WHERE Id = @id AND GenreId = @genreId
                         ";

                    cmd.Parameters.AddWithValue("@id", userGenreId);
                    cmd.Parameters.AddWithValue("@genreId", genre.Id);

                    cmd.ExecuteNonQuery();

                }
            }

        }



    }
}
