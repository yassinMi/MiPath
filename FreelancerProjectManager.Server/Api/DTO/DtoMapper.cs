using FreelancerProjectManager.Server.Domain.ProjectManagement;

namespace FreelancerProjectManager.Server.Api.DTO
{
    public static class DtoMapper
    {
        public static ProjectDto ToDto(this Project project)
        {
            if (project == null) return null;

            return new ProjectDto
            {
                ID = project.ID,
                Name = project.Name,
                Description = project.Description,
                ClientID = project.ClientID,
                Client = project.Client?.ToDto(),
                Tasks = project.Tasks?.Select(t => t.ToDto()).ToList() ?? new List<TaskDto>(),
                Status = project.Status.ToString()
            };
        }

        public static ClientDto ToDto(this Client client)
        {
            if (client == null) return null;

            return new ClientDto
            {
                ID = client.ID,
                Name = client.Name
            };
        }

        public static TaskDto ToDto(this PTask task)
        {
            if (task == null) return null;

            return new TaskDto
            {
                ID = task.ID,
                Title = task.Title,
                Description = task.Description,
                ProjectID = task.ProjectID,
                EstimateMinute = task.EstimateMinute,
                DueDate = task.DueDate,
                PlannedStart = task.PlannedStart,
                Status = task.Status.ToString(),
                CreatedAt = task.CreatedAt,
                CompletedAt = task.CompletedAt
            };
        }

        

      

       
    }

}
