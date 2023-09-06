using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
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
            //var DistictedTaskType = taskList.Select(x => x.TaskType).Distinct().ToList();
            var SortedTask = taskList.Select(x =>
            {
                var TaskVM = new TaskViewModel()
                {
                    Name = x.Name,
                    TaskType = x.TaskType,
                    Status = x.Status,
                    Reminder = x.Reminder,
                    date = x.date,
                    TaskList = taskList
                };


                return TaskVM;
            }).Distinct().ToList();

            var uniqueTaskType = SortedTask.GroupBy(x => x.TaskType).Select(x => x.First()).ToList();

            return uniqueTaskType;
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
                        Id= x.Id,
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
