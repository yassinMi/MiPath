using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Application.PorojectManagement.Queries;
using FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto;
using FreelancerProjectManager.Server.Application.TaskManagement.Commands;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreelancerProjectManager.Server.Api.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        public ProjectController()
        {

        }
        #region queries
        // GET: api/<ProjectController>
        [HttpGet]
        public async Task<IEnumerable<ProjectDto>> Get([FromServices] GetProjectsQueryHandler handler)
        {

            return await handler.Handle(new GetProjectsQuery() { }, CancellationToken.None);
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, [FromServices] GetProjectByIdQueryHandler hadnler)
        {
            var res = await hadnler.Handle(new GetProjectByIdQuery() { ProjectID = id }, cancellationToken: CancellationToken.None);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }
        [HttpGet("{projectId}/tasks")]
        public async Task <IEnumerable<TaskDto>> GetTasksForProject(int projectId, [FromServices] GetTasksQueryHandler handler)
        {
            return await handler.Handle(new GetTasksQuery() { ProjectID = projectId }, CancellationToken.None);

        }

        [HttpGet("{projectId}/progress")]
        public async Task<ProjectProgressDto> GetTasksForProject(int projectId, [FromServices] GetProjectProgressSummaryQueryHandler handler)
        {
            return await handler.Handle(new GetProjectProgressSummaryQuery() { ProjectID = projectId }, CancellationToken.None);

        }
        #endregion














        #region commands

        // POST api/<ProjectController>
        [Route("create")]
        [HttpPost]
        public async Task<int> Create([FromBody] CreateProjectCommand value, [FromServices] CreateProjectCommandHandler handler)
        {
            return await handler.Handle(value, CancellationToken.None);
        }


        [HttpPost]
        [Route("{projectId}/closeas")]
        public async Task CloseAs(int projectId, [FromBody] CloseProjectAsCommand value, [FromServices] CloseProjectAsCommandHandler handler)
        {
            await handler.Handle(value, CancellationToken.None);
        }

        [HttpPost]
        [Route("{projectId}/addtask")]
        public async Task<int> AddTask(int projectId, [FromBody] CreateTaskCommand value, [FromServices] CreateTaskCommandHandler handler)
        {
            return await handler.Handle(value, CancellationToken.None);
        }




        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id, [FromServices] DeleteProjectCommandHandler handler)
        {
            await handler.Handle(new DeleteProjectCommand() { ID = id }, CancellationToken.None);

        }
        #endregion
    }
}
