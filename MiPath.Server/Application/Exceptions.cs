namespace MiPath.Server.Application
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(string entityName, object id)
            : base($"{entityName} with id '{id}' not found")
        {
        }
        public EntityNotFoundException()
            : base($"entity not found")
        {
        }
    }
}
