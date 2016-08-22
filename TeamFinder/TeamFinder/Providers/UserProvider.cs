using System;
using System.Collections.Generic;
using System.Text;
using TeamFinder.Models;
using TeamFinder.SAL;

namespace TeamFinder.Providers
{
    public class UserProvider
    {
        private readonly MemoryUserService _service;

        public UserProvider()
        {
            _service = new MemoryUserService();
        }


        public User Login()
        {
            return _service.GetUserByUsername("Humperinn");
        }
    }
}
