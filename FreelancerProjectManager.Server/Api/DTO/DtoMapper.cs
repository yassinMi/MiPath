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
                Tasks = project.Tasks?.Select(t => t.ToDto()).ToList() ?? new List<TaskDto>()
            };
        }

        public static ClientDto ToDto(this Client client)
        {
            if (client == null) return null;

            return new ClientDto
            {
                ID = client.ID,
                Name = client.Name
                // omit Projects to avoid circular refs
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
                EstimateMinute = task.EstimateMinute
            };
        }

        // Reverse Mapping (DTO → Entity)
        public static Project ToEntity(this ProjectDto dto)
        {
            if (dto == null) return null;

            return new Project
            {
                ID = dto.ID,
                Name = dto.Name,
                Description = dto.Description,
                ClientID = dto.ClientID,
                Client = dto.Client?.ToEntity(),
                Tasks = dto.Tasks?.Select(t => t.ToEntity()).ToList() ?? new List<PTask>()
            };
        }

        public static Client ToEntity(this ClientDto dto)
        {
            if (dto == null) return null;

            return new Client
            {
                ID = dto.ID,
                Name = dto.Name
                // omit Projects to avoid circular refs
            };
        }

        public static PTask ToEntity(this TaskDto dto)
        {
            if (dto == null) return null;

            return new PTask
            {
                ID = dto.ID,
                Title = dto.Title,
                Description = dto.Description,
                ProjectID = dto.ProjectID,
                EstimateMinute = dto.EstimateMinute
            };
        }
    }

}
