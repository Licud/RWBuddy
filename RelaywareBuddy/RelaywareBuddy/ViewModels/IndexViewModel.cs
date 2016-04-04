using RelaywareBuddyData.Models;
using System;
using System.Collections.Generic;

namespace RelaywareBuddy.ViewModels
{
    public class IndexViewModel
    {
        public Customer customer { get; set; }

        public IEnumerable<CustomerAccess> customerAccess { get; set; }

        public CustomerAccess newCustomerAccess { get; set; }

        public Ticket ticket { get; set; }

        public Timer timer { get; set; }
    }

    public class TimerViewModel
    {

        public string taskGeneratedId { get; set; }
    }

    [Serializable]
    public class NewCustomerAccess
    {
        public string Customer { get; set;}

        public string IPAddress { get; set; }

        public string Password { get; set; }

        public string FileAcess { get; set; }
    }
}