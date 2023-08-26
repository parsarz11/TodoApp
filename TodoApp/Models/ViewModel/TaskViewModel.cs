using TodoApp.Data.Entites;

namespace TodoApp.Models.ViewModel
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TaskType { get; set; }
        public bool Status { get; set; }
        public DateTime? Reminder { get; set; }
        public DateTime? date { get; set; }
        public List<TodoTask> TaskList { get; set; }
    }
}
