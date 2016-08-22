using System;
using System.Collections.Generic;
using System.Text;

namespace TeamFinder.Models
{
    public class League
    {
        public int LeagueId { get; set; }

        public string Name { get; set; }
            
        public List<Event> Events { get; set; }

        public List<User> Users { get; set; }
    }
}
