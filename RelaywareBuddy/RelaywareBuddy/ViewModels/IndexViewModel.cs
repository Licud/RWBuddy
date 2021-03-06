﻿using RelaywareBuddyData.Models;
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

        public string AccessType { get; set; }
    }

    [Serializable]

    public class NewCustomer
    {
        public string CustomerName { get; set; }

        public bool HasMS { get; set; }

        public bool ReportingServices { get; set; }

        public DateTime MSStartDate { get; set; }

        public DateTime MSEndDate { get; set; }

        public int DurationOfService { get; set; }

        public string notes { get; set; }
    }
}