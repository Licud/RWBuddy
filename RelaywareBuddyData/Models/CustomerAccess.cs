using System.ComponentModel.DataAnnotations;

namespace RelaywareBuddyData.Models
{
    public class CustomerAccess
    {
        [Key]
        public int CustomerAccessId { get; set; }
        
        [Display(Name ="IP Address")]
        public string IPAddress { get; set; }

        public string Password { get; set; }

        public string AccessType { get; set; }

        public string Customer { get; set; }
    }
}