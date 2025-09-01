
using MiPath.Server.Domain.ProjectManagement;

namespace MiPath.Server.Application.ClientManagement.Queries
{
    public class GetClientsQuery
    {
       public ProjectStatus[]? WithProjectStatuses { get; set; }
    }
}
