using FreelancerProjectManager.Server.Application;
using FreelancerProjectManager.Server.Application.ClientManagement.Queries;
using FreelancerProjectManager.Server.Application.ClientManagement.Queries.Dto;
using FreelancerProjectManager.Server.Domain.ProjectManagement;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreelancerProjectManager.Server.Api.Controllers
{
    [Route("api/clients")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        public ClientController()
        {
        }
        #region queries
        // GET: api/<ProjectController>
        [HttpGet]
        public async Task<IEnumerable<ClientDto>> Get(
             [FromQuery] ProjectStatus[] WithProjectStatuses,
             [FromServices] GetClientsQueryHandler handler)
        {
            var query = new GetClientsQuery
            {
                WithProjectStatuses = WithProjectStatuses
            };
            return await handler.Handle(query, CancellationToken.None);
        }

        #endregion

        #region commands


        #endregion
    }
}
