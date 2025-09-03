using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.PorojectManagement.Commands;
using MiPath.Server.Domain.ProjectManagement;
using MiPath.Server.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class CreateProjectCommandHandler: ICommandHandler<CreateProjectCommand, int>
    {
        private readonly IProjectRepository projectRepository;
        private readonly IClientRepository clientRepository;
        private readonly ICurrentUserService currentUser;
        public CreateProjectCommandHandler(ICurrentUserService _currentUser, IProjectRepository projectRepository, IClientRepository clientRepository)
        {
            this.projectRepository = projectRepository;
            this.clientRepository = clientRepository;
            currentUser = _currentUser;

        }
        public async Task<int> Handle(CreateProjectCommand value, CancellationToken cancellationToken)
        {
            Client? client = null;
            var userId = currentUser.UserId ?? throw new InvalidOperationException("no user");
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
                if (currentUser.UserId == null) throw new Exception("no user");
                client = new Domain.ProjectManagement.Client() { UserID = currentUser.UserId.Value, Name = value.NewClientName };
            }
            var p = new Project() {UserID=userId, Name = value.Name, Client = client!, Description = value.Description ?? "" };
           
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
