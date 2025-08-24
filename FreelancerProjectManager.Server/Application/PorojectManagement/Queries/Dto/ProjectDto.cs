using FreelancerProjectManager.Server.Application.DTO;
using FreelancerProjectManager.Server.Application.TaskManagement.Queries.Dto;

namespace FreelancerProjectManager.Server.Application.PorojectManagement.Queries.Dto
{
    public class ProjectDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int ClientID { get; set; }
        public ClientDto Client { get; set; }

        public List<TaskDto> Tasks { get; set; } = new();
        public string Status { get; set; }
        public int LoggedMinutes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdatedAt { get; set; }
        public int TaskCount { get; set; }
        public decimal? EstimateValue { get; set; }
        

    }
   

    
}
