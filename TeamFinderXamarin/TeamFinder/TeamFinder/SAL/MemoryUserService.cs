using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TeamFinder.Models;

namespace TeamFinder.SAL
{
    public class MemoryUserService
    {
        static readonly List<User> _users;

        static MemoryUserService()
        {
            _users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Username = "Humperinn",
                    Email = "haugurjr@gmail.com"
                }
            };
        }

        public User GetUserByUsername(string username)
        {
            return _users.FirstOrDefault(x => x.Username == username);
        }
    }
}
