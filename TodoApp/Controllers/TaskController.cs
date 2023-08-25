using Microsoft.AspNetCore.Mvc;
using TodoApp.Data.Entites;
using TodoApp.Data.Repositories;
using TodoApp.Services;

namespace TodoApp.Controllers
{
    
    public class TaskController : Controller
    {
        private readonly TaskService _taskSerivce;
        private readonly TaskRepo _taskRepo;

        public TaskController(TaskService taskSerivce,TaskRepo taskRepo)
        {
            _taskSerivce = taskSerivce;
            _taskRepo = taskRepo;
        }


        [HttpGet]
        public IActionResult Tasks()
        {
            var taskList = _taskSerivce.TaskDisplay();
            return View(taskList);
        }


        [HttpGet]
        public IActionResult AddTask()
        {
            var taskOBJ = new TodoTask();
            return View(taskOBJ);
        }

        [HttpPost]
        public IActionResult AddTask(TodoTask todoTask)
        {
            _taskRepo.AddTask(todoTask);
            return RedirectToAction("Tasks");
        }

        public IActionResult DeleteTask() 
        { 
            return View();
        }

    }
}
