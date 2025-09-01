namespace MiPath.Server.Application
{
    public interface IQueryHandler< TQuery,  TResult>
    {
        public  Task<TResult> Handle(TQuery command, CancellationToken ct);
    }
    
}

