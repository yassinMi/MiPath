using FreelancerProjectManager.Server.Application.ClientManagement.Queries.Dto;
using FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;
using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Application.DTO
{
    public static class DtoMapper
    {
        public static ProjectDto ToDto(this Project project)
        {

            return new ProjectDto
            {
                ID = project.ID,
                Name = project.Name,
                Description = project.Description,
                ClientID = project.ClientID,
                Client = project.Client.ToDto(),
                Tasks = project.Tasks?.Select(t => t.ToDto()).ToList() ?? new List<TaskDto>(),
                Status = project.Status,
                CreatedAt = project.CreatedAt,
                EstimateValue = project.EstimateValue,
                LoggedMinutes = project.LoggedMinutes,
                
            };
        }

        public static ClientDto ToDto(this Client client)
        {
            return new ClientDto
            {
                ID = client.ID,
                Name = client.Name
            };
        }

        public static TaskDto ToDto(this PTask task)
        {
            return new TaskDto
            {
                ID = task.ID,
                Title = task.Title,
                Description = task.Description,
                ProjectID = task.ProjectID,
                EstimateMinute = task.EstimateMinute,
                DueDate = task.DueDate,
                PlannedStart = task.PlannedStart,
                Status = task.Status,
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt
            };
        }

        

      

       
    }

}
