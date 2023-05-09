using System;
using System.Collections.Generic;
using System.ComponentModel;


namespace NashvilleJams.Model
{
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int AUTHOR_ID => 2;
    }
}
