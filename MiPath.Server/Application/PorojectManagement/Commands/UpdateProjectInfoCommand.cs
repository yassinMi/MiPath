﻿namespace MiPath.Server.Application.PorojectManagement.Commands
{
    public class UpdateProjectInfoCommand
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? EstimateValue { get; set; }

    }
}
