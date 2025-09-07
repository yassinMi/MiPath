using MiPath.Server.Application;
using MiPath.Server.Application.DTO;
using MiPath.Server.Application.PorojectManagement.Commands;
using MiPath.Server.Application.TaskManagement.Commands;
using MiPath.Server.Application.TaskManagement.Queries;
using MiPath.Server.Application.TaskManagement.Queries.Dto;
using MiPath.Server.Domain.ProjectManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MiPath.Server.Api.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public TaskController()
        {
        }
        #region queries
        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<TaskDto> Get(
    [FromQuery] PTaskStatus[] status,
    [FromQuery] int? projectID,
    [FromQuery] bool? overdue,
    [FromQuery] DateTime? dueDateMin,
    [FromQuery] DateTime? dueDateMax,
    [FromQuery] DateTime? plannedStartMin,
    [FromQuery] DateTime? plannedStartMax,
     [FromQuery] DateTime? createdAtMin,
    [FromQuery] DateTime? createdAtMax,
    [FromQuery] DateTime? completedAtMin,
    [FromQuery] DateTime? completedAtMax,
    [FromQuery] string? orderBy,
    [FromQuery] bool? desc,
    [FromServices] GetTasksQueryHandler handler)
        {
            var query = new GetTasksQuery
            {
                Statuses = status.ToList(),
                ProjectID = projectID,
                DueDateMin = dueDateMin,
                DueDateMax = dueDateMax,
                PlannedStartMin = plannedStartMin,
                PlannedStartMax = plannedStartMax,
                CreatedAtMin = createdAtMin,
                CreatedAtMax = createdAtMax,
                CompletedAtMin = completedAtMin,
                CompletedAtMax = completedAtMax,
                IsOverdue = overdue,
                OrderByProperty = string.IsNullOrWhiteSpace(orderBy) ? nameof(PTask.CreatedAt) : orderBy,
                isDescending = desc ?? true
            };
            return handler.Handle(query, CancellationToken.None).Result;
        }
        [HttpGet("overview/thisweek")]
        public async Task<List<TaskDto>> GetThisWeekOverview([FromQuery] GetThisWeekOverviewQuery query, [FromServices] GetThisWeekOverviewQueryHandler handler)
        {
            return await handler.Handle(query, CancellationToken.None);
        }
        [HttpGet("overview/today")]
        public async Task<List<TaskDto>> GetTodayOverview([FromQuery] GetTodayOverviewQuery query, [FromServices] GetTodayOverviewQueryHandler handler)
        {
            return await handler.Handle(query, CancellationToken.None);
        }



        #endregion

        #region commands


        [HttpPost("{taskId}/markas")]
        public async Task MarkAs(int taskId, [FromBody] MarkTaskAsCommand value, [FromServices] MarkTaskAsCommandHandler handler)
        {
            try
            {
                await handler.Handle(new MarkTaskAsCommand() { ID = taskId, Intent = value.Intent }, CancellationToken.None);
            }
            catch (EntityNotFoundException)
            {
                NotFound();
            }
        }

        [HttpPost("{taskId}/update-due-date")]
        public async Task UpdateDueDate(int taskId, [FromBody] UpdateTaskDueDateCommand value, [FromServices] UpdateTaskDueDateCommandHandler handler)
        {
            try
            {
                await handler.Handle(value, CancellationToken.None);
            }
            catch (EntityNotFoundException)
            {
                NotFound();
            }
            catch (UnauthorizedAccessException)
            {
                Unauthorized();
            }
        }


        [HttpPost("{taskId}/update-planned-start")]
        public async Task UpdatePlannedStart(int taskId, [FromBody] UpdateTaskPlannedStartCommand value, [FromServices] UpdateTaskPlannedStartCommandHandler handler)
        {
            try
            {
                await handler.Handle(value, CancellationToken.None);
            }
            catch (EntityNotFoundException)
            {
                NotFound();
            }
            catch (UnauthorizedAccessException)
            {
                Unauthorized();
            }
        }

        [HttpPost("{taskId}/update-estimate-minute")]
        public async Task UpdateEstimateMinute(int taskId, [FromBody] UpdateTaskEstimateMinuteCommand value, [FromServices] UpdateTaskEstimateMinuteCommandHandler handler)
        {
            try
            {
                await handler.Handle(value, CancellationToken.None);
            }
            catch (EntityNotFoundException)
            {
                NotFound();
            }
            catch (UnauthorizedAccessException)
            {
                Unauthorized();
            }
        }

        [HttpPost("{taskId}/update-info")]
        public async Task UpdateInfo(int taskId, [FromBody] UpdateTaskInfoCommand value, [FromServices] UpdateTaskInfoCommandHandler handler)
        {
            try
            {
                await handler.Handle(value, CancellationToken.None);
            }
            catch (EntityNotFoundException)
            {
                NotFound();
            }
            catch (UnauthorizedAccessException)
            {
                Unauthorized();
            }
        }

        [HttpDelete("{taskId}")]
        public async Task Delete(int taskId, [FromServices] DeleteTaskCommandHandler handler)
        {
            await handler.Handle(new DeleteTaskCommand() { ID = taskId }, CancellationToken.None);
        }


        #endregion
    }
}
