using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NashvilleJams.Model;
using NashvilleJams.Utils;
using System.Collections.Generic;

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
                    cmd.CommandText = @"SELECT Id, FullName, Email, FireBaseUserId 
                       FROM [User]";
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
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }


        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT Id, FullName, Email, FireBaseUserId 
                              FROM [User]
                              WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {



                        if (reader.Read())
                        {
                            User user = new User
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                            };
                            return user;
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
