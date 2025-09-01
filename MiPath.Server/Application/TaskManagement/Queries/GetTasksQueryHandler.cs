using MiPath.Server.Application.DTO;
using MiPath.Server.Application.Interfaces;
using MiPath.Server.Application.TaskManagement.Queries.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MiPath.Server.Application.TaskManagement.Queries
{
    public class GetTasksQueryHandler:IQueryHandler<GetTasksQuery, List<TaskDto>>
    {
        private readonly ITaskRepository _taskRepository;
        public GetTasksQueryHandler(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }
        public async Task<List<TaskDto>> Handle(GetTasksQuery query, CancellationToken ct)
        {
            var tasks = _taskRepository.GetAll().AsQueryable();
            if (query.Statuses.Any())
                tasks = tasks.Where(t => query.Statuses.Contains(t.Status));

            if (query.ProjectID.HasValue)
                tasks = tasks.Where(t => t.ProjectID == query.ProjectID.Value);

            if (query.DueDateMin.HasValue)
                tasks = tasks.Where(t => t.DueDate >= query.DueDateMin.Value);
            if (query.DueDateMax.HasValue)
                tasks = tasks.Where(t => t.DueDate <= query.DueDateMax.Value);

            if (query.PlannedStartMin.HasValue)
                tasks = tasks.Where(t => t.PlannedStart >= query.PlannedStartMin.Value);
            if (query.PlannedStartMax.HasValue)
                tasks = tasks.Where(t => t.PlannedStart <= query.PlannedStartMax.Value);

            if (query.CreatedAtMin.HasValue)
                tasks = tasks.Where(t => t.CreatedAt >= query.CreatedAtMin.Value);
            if (query.CreatedAtMax.HasValue)
                tasks = tasks.Where(t => t.CreatedAt <= query.CreatedAtMax.Value);

            if (query.CompletedAtMin.HasValue)
                tasks = tasks.Where(t => t.CompletedAt >= query.CompletedAtMin.Value);
            if (query.CompletedAtMax.HasValue)
                tasks = tasks.Where(t => t.CompletedAt <= query.CompletedAtMax.Value);

            var result = await tasks
                .ApplyOrder(query.OrderByProperty, query.isDescending??false)
                .Select(t => t.ToDto())
                .ToListAsync(ct);

            return result;



            //if (request.ByProject == null)
            //{
            //    return await _taskRepository.GetAll().Select(t => t.ToDto()).ToListAsync();
            //}
            //else
            //{
            //    return await _taskRepository.GetAll()

            //    .Where(t => t.ProjectID == request.ByProject.Value).Select(t => t.ToDto()).ToListAsync();
            //}
              

        }


    }


public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrder<T>(
            this IQueryable<T> query, string? orderByProperty, bool descending = false)
        {
            if (string.IsNullOrWhiteSpace(orderByProperty))
                return query;

            var param = Expression.Parameter(typeof(T), "x");
            var property = Expression.PropertyOrField(param, orderByProperty);
            var lambda = Expression.Lambda(property, param);

            string methodName = descending ? "OrderByDescending" : "OrderBy";

            var result = typeof(Queryable).GetMethods()
                .Single(
                    m => m.Name == methodName
                         && m.IsGenericMethodDefinition
                         && m.GetParameters().Length == 2
                )
                .MakeGenericMethod(typeof(T), property.Type)
                .Invoke(null, new object[] { query, lambda });
            
            return (IQueryable<T>)result!;
        }
    }

}


