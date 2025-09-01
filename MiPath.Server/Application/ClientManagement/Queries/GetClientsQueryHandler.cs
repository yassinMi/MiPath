using MiPath.Server.Application.ClientManagement.Queries.Dto;
using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MiPath.Server.Application.ClientManagement.Queries
{
    public class GetClientsQueryHandler : IQueryHandler<GetClientsQuery, List<ClientDto>>
    {
        private readonly IClientRepository _clientRepository;
        private readonly IProjectRepository _projectRepository;
        public GetClientsQueryHandler(IClientRepository clientRepository, IProjectRepository projectRepository)
        {
            _clientRepository = clientRepository;
            _projectRepository = projectRepository;
        }
        public async Task<List<ClientDto>> Handle(GetClientsQuery query, CancellationToken ct)
        {
            var tasks = _clientRepository.GetAll().AsQueryable();
            if (query.WithProjectStatuses != null && query.WithProjectStatuses.Any())
                tasks = tasks.Where(c => _projectRepository.Query().Any(p => p.ClientID == c.ID && query.WithProjectStatuses.Contains(p.Status)));
            var result = await tasks
                .Select(t => t.ToDto())
                .ToListAsync(ct);
            return result;
        }
    }

}


