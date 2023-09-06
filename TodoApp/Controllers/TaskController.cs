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
        private readonly EmailSender _emailSender;

        public TaskController(TaskService taskSerivce,TaskRepo taskRepo, EmailSender emailSender)
        {
            _taskSerivce = taskSerivce;
            _taskRepo = taskRepo;
            _emailSender = emailSender;
        }


        [HttpGet]
        public IActionResult Tasks()
        {
            //_emailSender.SendEmail("www.google.com","p.razaghan1387@gmail.com");
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

        [HttpGet]
        public IActionResult DashBoard()
        {

            return View();
        }

        public IActionResult test()
        {
            return View();
        }
    }
}
