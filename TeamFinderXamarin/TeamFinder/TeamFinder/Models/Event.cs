using System;
using System.Collections.Generic;
using System.Text;

namespace TeamFinder.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string Place { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public int Capacity { get; set; }
    }
}
