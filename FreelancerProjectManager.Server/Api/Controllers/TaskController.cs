using FreelancerProjectManager.Server.Api.Command;
using FreelancerProjectManager.Server.Api.DTO;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreelancerProjectManager.Server.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        readonly AppDbContext dbContext;
        public TaskController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        #region queries
        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<TaskDto> Get([FromQuery]string usecase)
        {
            var res = dbContext.Tasks.AsQueryable();
            if(usecase == "today")
            {
                res = res.Where(t => true);//todo we need fields PlannedStart, PlannedEnd, CompetedAt
            }
            else if(usecase == "thisweek")
            {
                res = res.Where(t => true);//todo we need fields PlannedStart, PlannedEnd, CompetedAt
            }
            return res.Select(p => p.ToDto());

        }
       
        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public TaskDto Get(int id)
        {
            return dbContext.Tasks.Find(id).ToDto();
        }

        #endregion

        #region commands
        // POST api/<ProjectController>
        [HttpPost]
        public void Create([FromBody] CreateTaskCommand value)
        {
            //note: handled in ProjectController.AddTask
            throw new NotImplementedException("use ProjectController.AddTask instead");
        }

        [HttpPost("{taskId}/markas")]
        public void MarkAs(int taskId, MarkTaskAsCommand value)
        {
            var task = dbContext.Tasks.Find(taskId);
            if(task == null)
            {
                throw new ArgumentException("task not found");
            }
            switch (value.Status)
            {
                case MarkTaskAsCommand.MarkAs.InProgress:
                    task.Status = Domain.ProjectManagement.PTaskStatus.InProgress;
                    break;
                case MarkTaskAsCommand.MarkAs.Completed:
                    task.Status = Domain.ProjectManagement.PTaskStatus.Done;
                    break;
                case MarkTaskAsCommand.MarkAs.ReOpen:
                    task.Status = Domain.ProjectManagement.PTaskStatus.ToDo;
                    break;
                default:
                    throw new ArgumentException("unknown action");
            }
            if(value.Status == MarkTaskAsCommand.MarkAs.Completed)
            {
                task.CompletedAt = DateTime.UtcNow;
            }
            else
            {
                task.CompletedAt = null;
            }
            dbContext.SaveChanges();
        }


        [HttpDelete("{taskId}")]
        public void Delete(int taskId)
        {
           
            var task = dbContext.Tasks.Find(taskId);
            if(task == null)
            {
                throw new ArgumentException("task not found");
            }
           
            dbContext.Tasks.Remove(task);
            dbContext.SaveChanges();
        }


        #endregion
    }
}
