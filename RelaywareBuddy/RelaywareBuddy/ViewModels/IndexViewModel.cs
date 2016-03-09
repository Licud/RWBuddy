using RelaywareBuddyData.Models;
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
}