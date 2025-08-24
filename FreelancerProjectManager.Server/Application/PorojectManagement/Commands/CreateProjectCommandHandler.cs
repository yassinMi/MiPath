using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Commands
{
    public class CreateProjectCommandHandler: ICommandHandler<CreateProjectCommand, int>
    {
        private readonly IProjectRepository projectRepository;
        private readonly IClientRepository clientRepository;
        public CreateProjectCommandHandler(IProjectRepository projectRepository, IClientRepository clientRepository)
        {
            this.projectRepository = projectRepository;
            this.clientRepository = clientRepository;

        }
        public async Task<int> Handle(CreateProjectCommand value, CancellationToken cancellationToken)
        {
            var p = new Domain.ProjectManagement.Project();
            if (value.ClientID == null && string.IsNullOrWhiteSpace(value.NewClientName))
            {
                throw new ArgumentException("ClientID or ClientName must be provided");
            }
            else if (value.ClientID != null)
            {
                var client = await this.clientRepository.GetById(value.ClientID.Value);
                if (client == null)
                {
                    throw new ArgumentException("ClientID not found");
                }
                p.ClientID = client.ID;
            }
            else if (value.NewClientName != null)
            {
                p.Client = new Domain.ProjectManagement.Client() { Name = value.NewClientName };
            }
            p.Name = value.Name;
            p.Description = value.Description ?? "";
            p.Status = value.Status == CreateProjectCommand.ProjectCreationStatus.Active
                ? Domain.ProjectManagement.ProjectStatus.Active
                : value.Status == CreateProjectCommand.ProjectCreationStatus.Scoping
                ? Domain.ProjectManagement.ProjectStatus.Scoping
                : throw new ArgumentException("unknownProjectCreationStatus intent");
            p.CreatedAt = DateTime.UtcNow;

            await projectRepository.AddAsync(p);
            return p.ID;
        }
    }
}
