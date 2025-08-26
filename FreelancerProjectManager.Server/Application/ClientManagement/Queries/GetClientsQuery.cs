
using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.ClientManagement.Queries
{
    public class GetClientsQuery
    {
       public ProjectStatus[]? WithProjectStatuses { get; set; }
    }
}
