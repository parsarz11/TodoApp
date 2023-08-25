using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Services;

namespace TodoApp.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class TaskApiController : ControllerBase
    {
        private readonly TaskService _taskService;
        public TaskApiController(TaskService taskService) 
        {
            _taskService = taskService;
        }

        [HttpGet]
        public IActionResult GetTaskByType(string TaskType)
        {
            var Result = _taskService.TaskDisplayByType(TaskType);
            return Ok(Result);
        }
    }
}
