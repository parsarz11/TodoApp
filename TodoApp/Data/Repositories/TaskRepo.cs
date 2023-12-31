﻿using TodoApp.Data.Context;
using TodoApp.Data.Entites;

namespace TodoApp.Data.Repositories
{
    public class TaskRepo
    {
        private readonly TodoDatabaseContext _TodoContext;

        public TaskRepo(TodoDatabaseContext todoContext)
        {
            _TodoContext = todoContext;
        }

        public List<TodoTask> TasksList()
        {
            var List = _TodoContext.Tasks.ToList();
            return List;
        }

        public List<TodoTask> GetTasks(string taskType)
        {
            var GetTask = _TodoContext.Tasks.Where(x=> x.TaskType == taskType).ToList();
            return GetTask;
        }

        public void AddTask(TodoTask task)
        {
            _TodoContext.Tasks.Add(task);
            _TodoContext.SaveChanges();
        }
        
        public TodoTask GetTaskById(int id)
        {
           return _TodoContext.Tasks.Where(x=>x.Id == id).FirstOrDefault();
        }

        public void TaskStatus(int Id, bool check)
        {
            if (check == true)
            {
                var selectById = _TodoContext.Tasks.SingleOrDefault(x => x.Id == Id);
                selectById.Status = false;
                _TodoContext.SaveChanges();
            }
            else if (check == false)
            {
                var selectById = _TodoContext.Tasks.SingleOrDefault(x => x.Id == Id);
                selectById.Status = true;
                _TodoContext.SaveChanges();
            }

        }
    }
}
