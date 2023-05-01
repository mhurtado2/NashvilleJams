using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using NashvilleJams.Utils;
using System.Collections.Generic;
using System.Linq;

namespace NashvilleJams.Repository
{
    public class UserRepository: BaseRepository, IUserRepository
    {

        public UserRepository(IConfiguration config) : base(config) { }

        //getallusers is messed up
        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.FullName, u.Email, u.FireBaseUserId, ug.UserId as UserId,
                        ug.GenreId as GenreId, g.Name, g.Id as RandomId
                        FROM [User] u
                       LEFT JOIN UserGenre ug on ug.UserId = u.Id
                       LEFT JOIN Genre g on g.Id = ug.GenreId";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            UserGenre = new UserGenre
                            {
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                GenreId = DbUtils.GetInt(reader, "GenreId"),
                            },
                            Genre = new Genre
                            {
                                Id = DbUtils.GetInt(reader, "RandomId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }

       


        //public User GetUserById(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                      SELECT Id, FullName, Email, FireBaseUserId 
        //                      FROM [User]
        //                      WHERE id = @id";

        //            cmd.Parameters.AddWithValue("@id", id);
        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {



        //                if (reader.Read())
        //                {
        //                    User user = new User
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        FullName = DbUtils.GetString(reader, "FullName"),
        //                        Email = DbUtils.GetString(reader, "Email"),
        //                        FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
        //                    };
        //                    return user;
        //                }
        //                else
        //                {
        //                    return null;
        //                }
        //            }

        //        }

        //    }
        //}


        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, FullName, Email, FireBaseUserId 
                              FROM [User]
                         WHERE FireBaseUserId = @FireBaseUserId";

                    DbUtils.AddParameter(cmd, "@FireBaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FireBaseUserId, FullName, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseUserId, @FullName, @Email)";
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", userProfile.FireBaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
