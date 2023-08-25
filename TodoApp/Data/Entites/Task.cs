using System.Data;
using System.ComponentModel.DataAnnotations;

namespace TodoApp.Data.Entites
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TaskType { get; set; }
        public bool Status { get; set; }
        public DateTime? Reminder { get; set; }
        public DateTime? date { get; set; }
    }
}
