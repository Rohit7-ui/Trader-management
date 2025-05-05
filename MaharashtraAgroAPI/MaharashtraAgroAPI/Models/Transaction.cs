using System;
using System.ComponentModel.DataAnnotations;

namespace YourProject.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        public string CustomerName { get; set; }

        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        // 🛑 Add this if it's missing
        public string Type { get; set; }  // Example: "Credit" or "Debit"

        public string Status { get; set; }  // Example: "Paid" or "Pending"
    }
}
