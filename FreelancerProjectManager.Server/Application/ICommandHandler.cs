namespace FreelancerProjectManager.Server.Application
{
    public interface ICommandHandler< TCommand,  TResult>
    {
        public abstract Task<TResult> Handle(TCommand command, CancellationToken ct);
    }
    public interface ICommandHandler<TCommand>
    {
        public abstract Task Handle(TCommand command, CancellationToken ct);
    }
}

