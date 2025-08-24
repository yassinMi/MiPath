using FreelancerProjectManager.Server.Api.Command;
using FreelancerProjectManager.Server.Api.DTO;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreelancerProjectManager.Server.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        readonly AppDbContext dbContext;
        public ProjectController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        #region queries
        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<ProjectDto> Get()
        {
            return dbContext.Project
                .Include(p => p.Client)
                .Select(p => new ProjectDto()
                {
                    ID = p.ID,
                    Name = p.Name,
                    Description = p.Description,
                    ClientID = p.ClientID,
                    Client = p.Client.ToDto(),
                    Status = p.Status.ToString(),
                    TaskCount = p.Tasks.Count,
                });

        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var res = dbContext.Project.Include(p => p.Client).FirstOrDefault(p=>p.ID==id)?.ToDto();
            if (res == null)
            { 
                return NotFound();
            }
            return Ok(res);
        }
        [HttpGet("{projectId}/task")]
        public IEnumerable<TaskDto> GetTasksForProject(int projectId)
        {
            return dbContext.Tasks.Where(t=>t.ProjectID==projectId).Select(t=>t.ToDto());
        }
        #endregion














        #region commands

        // POST api/<ProjectController>
        [Route("create")]
        [HttpPost]
        public int Create([FromBody] CreateProjectCommand value)
        {
            var p = new Domain.ProjectManagement.Project();
            if(value.ClientID==null && string.IsNullOrWhiteSpace(value.NewClientName))
            {
                throw new ArgumentException("ClientID or ClientName must be provided");
            }
            else if(value.ClientID!=null)
            {
                var client = dbContext.Clients.Find(value.ClientID);
                if(client==null)
                {
                    throw new ArgumentException("ClientID not found");
                }
                p.ClientID = client.ID;
            }
            else if(value.NewClientName!=null)
            {
                p.Client = new Domain.ProjectManagement.Client() { Name = value.NewClientName };
            }
            p.Name =  value.Name;
            p.Description = value.Description??"";
            p.Status = value.Status == ProjectCreationStatus.Active ? Domain.ProjectManagement.ProjectStatus.Active : Domain.ProjectManagement.ProjectStatus.Scoping;
            p.CreatedAt = DateTime.UtcNow;
            

            dbContext.Project.Add(p);
            dbContext.SaveChanges();
            return p.ID;
        }


        [HttpPost]
        [Route("{projectId}/closeas")]
        public void CloseAs(int projectId, CloseProjectAsCommand value)
        {
            //once closed, cannot be reopened
            var project = dbContext.Project.Find(projectId);
            if(project==null)
            {
                throw new ArgumentException("ProjectID not found");
            }
            if(project.Status == Domain.ProjectManagement.ProjectStatus.Canceled
                || project.Status == Domain.ProjectManagement.ProjectStatus.Completed)
            {
                throw new InvalidOperationException("Project is already closed");
            }
            project.Status = value.Reason== CloseProjectAsCommand.CloseAs.Completed? Domain.ProjectManagement.ProjectStatus.Completed
                : value.Reason == CloseProjectAsCommand.CloseAs.Canceld ? Domain.ProjectManagement.ProjectStatus.Canceled
                :throw new ArgumentException("unknown close reason");

            //todo consider updating child tasks's availability for fast queriying 
            dbContext.SaveChanges();
        }

        [HttpPost]
        [Route("{projectId}/addtask")]
        public int AddTask(int projectId, CreateTaskCommand value)
        {
            var project = dbContext.Project.Find(projectId);
            if (project == null)
            {
                throw new ArgumentException("ProjectID not found");
            }
            var p = new Domain.ProjectManagement.PTask();
            p.Title = value.Title;
            p.Description = value.Description;
            p.ProjectID = projectId;
            p.EstimateMinute = value.EstimateMinute;
            p.DueDate = value.DueDate;
            p.PlannedStart = value.PlannedStart;
            p.CreatedAt = DateTime.UtcNow;
            p.Status = Domain.ProjectManagement.PTaskStatus.ToDo;
            dbContext.Tasks.Add(p);
            dbContext.SaveChanges();
            return p.ID;
        }


      

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbContext.Project.Remove(new Domain.ProjectManagement.Project() { ID = id });
        }
        #endregion
    }
}
