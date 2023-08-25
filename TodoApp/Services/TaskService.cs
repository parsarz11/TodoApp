using System.ComponentModel.DataAnnotations;
using TodoApp.Data.Repositories;
using TodoApp.Models.ViewModel;

namespace TodoApp.Services
{
    public class TaskService
    {
        private readonly TaskRepo _taskRepo;
        public TaskService(TaskRepo taskRepo) 
        { 
            _taskRepo = taskRepo;
        }

        public List<TaskViewModel> TaskDisplay()
        {
            var taskList = _taskRepo.TasksList();
            var SortedTask = taskList.Select(x =>
            {
                var TaskVM = new TaskViewModel()
                {
                    Name = x.Name,
                    TaskType = x.TaskType,
                    Status = x.Status,
                    Reminder = x.Reminder,
                    date = x.date
                };
                return TaskVM;
            }).ToList();
            return SortedTask;
        }

        public List<TaskViewModel> TaskDisplayByType(string taskType)
        {
            if (taskType == "All")
            {
                var taskList = _taskRepo.TasksList();
                var SortedTask = taskList.Select(x =>
                {
                    var TaskVM = new TaskViewModel()
                    {
                        Name = x.Name,
                        TaskType = x.TaskType,
                        Status = x.Status,
                        Reminder = x.Reminder,
                        date = x.date
                    };
                    return TaskVM;
                }).ToList();
                return SortedTask;
            }
            else
            {
                var taskList = _taskRepo.TasksList();
                var SortedTask = taskList.Where(x => x.TaskType == taskType).Select(x =>
                {
                    var TaskVM = new TaskViewModel()
                    {
                        Name = x.Name,
                        TaskType = x.TaskType,
                        Status = x.Status,
                        Reminder = x.Reminder,
                        date = x.date
                    };
                    return TaskVM;
                }).ToList();
                return SortedTask;
            }
        }

    }
}
