using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using NashvilleJams.Model;
using NashvilleJams.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;

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

                    //this line adds firebase parameter to command object
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", firebaseUserId);

                    //initializes User object variable user with a null value
                    //to account for when a user is not found
                    User user = null;

                    var reader = cmd.ExecuteReader();

                    //this line checks for a record to read from the data reader, if there is code runs
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
        //This is the method declaration. It takes a User object as a parameter and does not return any value (void).
        {
            using (var conn = Connection)
               // This line declares and initializes a connection(conn) using a Connection property or variable.
               // The using statement ensures that the connection is properly disposed of when it's no longer needed.
            {
                conn.Open();
                //this line opens connection

                using (var cmd = conn.CreateCommand())

                //This line declares and initializes a command (cmd) associated with the connection.
                //The CreateCommand method creates a new instance of the command object.
                {
                    cmd.CommandText = @"INSERT INTO [User] (FireBaseUserId, FullName, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseUserId, @FullName, @Email, @UserTypeId)";

                    //This sets the SQL command text for the command object.
                    //It contains an INSERT statement that inserts a new row into the [User] table.
                    //The OUTPUT INSERTED.ID clause retrieves the auto-generated ID value of the newly inserted row.
                    //The @FireBaseUserId, @FullName, @Email, and @UserTypeId are parameters that will be replaced with the corresponding values
                    //from the user object.

                    DbUtils.AddParameter(cmd, "@FireBaseUserId", user.FireBaseUserId);
                    DbUtils.AddParameter(cmd, "@FullName", user.FullName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserTypeId);

                //    cmd: The cmd command object to which the parameter will be added.
                //parameterName: The name of the parameter, starting with @ symbol followed by the parameter name(e.g., @FireBaseUserId).
                 // parameterValue: The value of the parameter, obtained from the corresponding
                 // property of the user object(user.FireBaseUserId, user.FullName, user.Email, user.UserTypeId).

                    user.Id = (int)cmd.ExecuteScalar();
                    //This line executes the command and retrieves the auto-generated ID value of the newly inserted user.
                    //The ExecuteScalar method is used because the query returns a single scalar value (the inserted ID).
                    //The returned value is cast to an int and assigned to the Id property of the user object.
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
