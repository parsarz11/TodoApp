using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Services;

namespace TodoApp.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class DashBoardApiController : ControllerBase
    {
        private readonly DashBoardServices _DashBoardServices;

        public DashBoardApiController(DashBoardServices dashBoardServices)
        {
            _DashBoardServices = dashBoardServices;
        }

        [HttpGet] 
        public IActionResult CheckedTaskPresentage() 
        {
            return Ok(_DashBoardServices.CheckedTaskPersentage());
        }

        [HttpGet]
        public IActionResult TasksCount(bool Checked)
        {
            return Ok(_DashBoardServices.TaskCount(Checked));
        }

        [HttpGet]
        public IActionResult ChartData(string Type)
        {

            return Ok(_DashBoardServices.PieChartData(Type));
        }

        
    }
}
