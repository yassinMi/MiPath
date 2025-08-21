using FreelancerProjectManager.Server.Api.Command;
using FreelancerProjectManager.Server.Api.DTO;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.AspNetCore.Mvc;

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
        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<ProjectDto> Get()
        {
            return dbContext.Project.Select(p=>p.ToDto());

        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public ProjectDto Get(int id)
        {
            return dbContext.Project.Find(id).ToDto();
        }

        // POST api/<ProjectController>
        [HttpPost]
        public void Post([FromBody] CreateProjectCommand value)
        {
            var p = new Domain.ProjectManagement.Project();
            p.Client = new Domain.ProjectManagement.Client() { Name = value.ClientName??"unknown" };
            p.Name =  value.Name;
            p.Description = value.Description??"";

            dbContext.Project.Add(p);
            dbContext.SaveChanges();
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}
