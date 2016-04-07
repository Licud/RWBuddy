using System.ComponentModel.DataAnnotations;
using System;

namespace RelaywareBuddyData.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Display (Name="Name")]
        public string CustomerName { get; set; }

        [Display (Name ="MS Start Date")]
        public DateTime? MSStartDate { get; set; }

        [Display (Name ="MS End Date")]
        public DateTime ? MSEndDate { get; set; }

        public bool ? HasMS { get; set; }

        [Display (Name ="Service Duration")]
        public int ? DurationOfService { get; set; }

        [Display(Name ="Reporting")]
        public bool ? ReportingServices { get; set; }

        [Display (Name ="Notes")]
        public string notes { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
