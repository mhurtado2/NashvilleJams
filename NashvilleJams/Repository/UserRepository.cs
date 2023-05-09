using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using NashvilleJams.Model;
using NashvilleJams.Utils;
using System.Collections.Generic;
using System.Linq;

namespace NashvilleJams.Repository
{
    public class UserRepository: BaseRepository, IUserRepository
    {

        public UserRepository(IConfiguration config) : base(config) { }

        
        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.FullName, u.Email, u.FireBaseUserId, u.UserTypeId, ug.UserId as UserId,
                        ug.GenreId as GenreId, g.Name as GenreName, g.Id as RandomId, ut.Id AS TypeId, ut.Name AS UserTypeName
                        FROM [User] u
                       INNER JOIN UserGenre ug on ug.UserId = u.Id
                       INNER JOIN Genre g on g.Id = ug.GenreId
                       INNER JOIN UserType ut on ut.Id = u.UserTypeId";


                    var reader = cmd.ExecuteReader();
                    var users = new List<User>();

                    while (reader.Read())
                    {
                        var userId = DbUtils.GetInt(reader, "Id");
                        var user = users.FirstOrDefault(u => u.Id == userId);
                        if (user == null)
                        { 
                            user = new User
                        {
                            Id = userId,
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType
                            {
                                Id = DbUtils.GetInt(reader, "TypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            },
                            UserGenre = new UserGenre
                            {
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                GenreId = DbUtils.GetInt(reader, "GenreId"),
                            },
                            Genres = new List<Genre>()
                        };
                            users.Add(user);
                    }
                        if (!reader.IsDBNull(reader.GetOrdinal("GenreName")))
                        {
                            user.Genres.Add(new Genre()
                            {
                                Id = DbUtils.GetInt(reader, "RandomId"),
                                Name = DbUtils.GetString(reader, "GenreName")
                            });
                        }
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
                       SELECT Id, FullName, Email, FireBaseUserId, UserTypeId 
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
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FireBaseUserId, FullName, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseUserId, @FullName, @Email, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", user.FireBaseUserId);
                    DbUtils.AddParameter(cmd, "@FullName", user.FullName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);
                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM [User] WHERE Id = @id;";


                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
}
