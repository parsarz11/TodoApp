using TodoApp.Data.Repositories;
using TodoApp.Models.ViewModel;

namespace TodoApp.Services
{
    public class DashBoardServices
    {
        private readonly TaskService _taskService;
        private readonly TaskRepo _taskRepo ;

        public DashBoardServices(TaskRepo taskRepo,TaskService taskService)
        {
            _taskRepo = taskRepo;
            _taskService = taskService;
        }

        public int TaskCount(bool Checked)
        {
            if (Checked == false)
            {
                return _taskRepo.TasksList().Count;
            }
            else
            {
                var CheckedTasks = _taskRepo.TasksList().Where(x=>x.Status == true).ToList().Count;
                return CheckedTasks;
            }
        }

        public int CheckedTaskPersentage()
        {
            var AllTask = TaskCount(false);
            var CheckedTask = TaskCount(true);
            var Getpresent = 100 / AllTask;
            var CheckPersent = Getpresent * CheckedTask;
            return CheckPersent;
        }


        
        public List<ChartViewModel> PieChartData(string type)
        {
            if (type == "All")
            {
                var taskList = _taskService.TaskDisplay();

                var sorted = taskList.Select(x =>
                {

                    var countValue = x.TaskList.Where(y => y.TaskType == x.TaskType).Count();

                    var ChartVM = new ChartViewModel
                    {
                        value = countValue,
                        name = x.TaskType,
                    };
                    return ChartVM;
                }).ToList();


                return sorted;
            }else
            {
                var taskList = _taskRepo.TasksList();
                

                var sorted = taskList.Where(y=>y.Status == true).Select(x =>
                   {
                       


                            var ccount = taskList.Where(y=>y.Status == true&& y.TaskType == x.TaskType).Count();
                           var ChartVM = new ChartViewModel
                           {
                               value = ccount,
                               name = x.TaskType,
                           };
                       
                                                  
                       
                       return ChartVM;
                       
                   }).ToList();

                var uniqueTaskType = sorted.GroupBy(x => x.name).Select(y => y.First()).ToList();
                return uniqueTaskType;
            }
            
        }
        
    }
}
