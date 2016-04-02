using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RelaywareBuddyData.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }

        [Display (Name ="RW Id")]
        public int RWId { get; set; }

        public int CustomerId { get; set; }

        public string Description { get; set; }

        [Display(Name ="Date Created")]
        public DateTime DateCreated { get; set; }

        public int Duration { get; set; }

        public string Status { get; set; }

        public string Priority { get; set; }
        
        [Display (Name ="Assigned To")]
        public string AssignedTo { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer Customer { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastUpdated { get; set; }
    }
}
