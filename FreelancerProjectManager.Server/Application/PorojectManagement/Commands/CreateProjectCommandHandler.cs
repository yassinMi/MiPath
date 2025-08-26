using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Domain.ProjectManagement;
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
            Client? client = null;
            if (value.ClientID == null && string.IsNullOrWhiteSpace(value.NewClientName))
            {
                throw new ArgumentException("ClientID or ClientName must be provided");
            }
            else if (value.ClientID != null)
            {
                client = await this.clientRepository.GetById(value.ClientID.Value);
                if (client == null)
                {
                    throw new ArgumentException("ClientID not found");
                }
                
            }
            else if (value.NewClientName != null)
            {
                client = new Domain.ProjectManagement.Client() { Name = value.NewClientName };
            }
            var p = new Project() { Name = value.Name, Client = client!, Description = value.Description ?? "" };
           
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
