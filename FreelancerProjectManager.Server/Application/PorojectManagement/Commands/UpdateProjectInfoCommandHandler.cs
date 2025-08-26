using FreelancerProjectManager.Server.Application.Interfaces;
using FreelancerProjectManager.Server.Application.PorojectManagement.Commands;
using FreelancerProjectManager.Server.Infrastructure;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Commands
{
    public class UpdateProjectInfoCommandHandler : ICommandHandler<UpdateProjectInfoCommand>
    {
        private readonly IProjectRepository projectRepository;
        public UpdateProjectInfoCommandHandler(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }
        public async Task Handle(UpdateProjectInfoCommand value, CancellationToken ct)
        {
            var project = await projectRepository.GetByIdAsync(value.ID);
            if (project == null)
            {
                throw new EntityNotFoundException();
            }
           
            project.EstimateValue = value.EstimateValue;
            if(value.Name!=null)
            project.Name = value.Name;
            if (value.Description != null)
            project.Description = value.Description;

            await projectRepository.UpdateAsync(project);
        }
    }
}
