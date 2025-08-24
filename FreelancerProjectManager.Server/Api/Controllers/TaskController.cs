using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Application.TaskManagement.Commands;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreelancerProjectManager.Server.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public TaskController()
        {
        }
        #region queries
        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<TaskDto> Get([FromQuery]string usecase, [FromServices] GetTasksQueryHandler handler)
        {
            return handler.Handle(new GetTasksQuery() {}, CancellationToken.None).Result;
           

        }
        [HttpGet("overview/thisweek")]
        public async Task<List<TaskDto>> GetThisWeekOverview([FromServices] GetThisWeekOverviewQueryHandler handler)
        {
           return await handler.Handle(new GetThisWeekOverviewQuery() { }, CancellationToken.None);
        }
        [HttpGet("overview/today")]
        public async Task<List<TaskDto>> GetTodayOverview([FromServices] GetTodayOverviewQueryHandler handler)
        {
            return await handler.Handle(new GetTodayOverviewQuery() { }, CancellationToken.None);
        }

        

        #endregion

        #region commands
       

        [HttpPost("{taskId}/markas")]
        public async Task MarkAs(int taskId, [FromBody] MarkTaskAsCommand value, [FromServices] MarkTaskAsCommandHandler handler)
        {
            await handler.Handle(new MarkTaskAsCommand() { ID = taskId, Intent = value.Intent }, CancellationToken.None);
        }


        [HttpDelete("{taskId}")]
        public async Task Delete(int taskId, [FromServices] DeleteTaskCommandHandler handler)
        {
           await handler.Handle( new DeleteTaskCommand() { ID= taskId}, CancellationToken.None);

        }


        #endregion
    }
}
