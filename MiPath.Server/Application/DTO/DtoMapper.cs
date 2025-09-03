using MiPath.Server.Application.ClientManagement.Queries.Dto;
using MiPath.Server.Application.PorojectManagement.Queries.Dto;
using MiPath.Server.Application.TaskManagement.Queries.Dto;
using MiPath.Server.Application.UserManagement.Queries.Dto;
using MiPath.Server.Domain.ProjectManagement;
using MiPath.Server.Domain.UserManagement;

namespace MiPath.Server.Application.DTO
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

        public static UserDto ToDto(this User u)
        {
            return new UserDto
            {
                ID = u.ID,
                Name = u.Name,
                Email = u.Email,
            };
        }




    }

}
