using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Data.Repositories;
using TodoApp.Services;

namespace TodoApp.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class TaskApiController : ControllerBase
    {
        private readonly TaskService _taskService;
        private readonly TaskRepo _taskRepo;
        public TaskApiController(TaskService taskService,TaskRepo taskRepo) 
        {
            _taskRepo = taskRepo;
            _taskService = taskService;
        }

        [HttpGet]
        public IActionResult GetTaskByType(string TaskType)
        {
            var Result = _taskService.TaskDisplayByType(TaskType);
            return Ok(Result);
        }

        [HttpGet]
        public IActionResult TaskStatus(bool Status, int Id)
        {
            _taskRepo.TaskStatus(Id, Status);
            return Ok();
        }
        
    }
}
