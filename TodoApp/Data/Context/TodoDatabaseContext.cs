using Microsoft.EntityFrameworkCore;
using TodoApp.Data.Entites;

namespace TodoApp.Data.Context
{
    public class TodoDatabaseContext:DbContext
    {
        public TodoDatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<TodoTask> Tasks { get; set; }
    }
}
