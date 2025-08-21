import React from 'react';
import type { ProjectStatus } from './Model/ProjectStatus';

interface ProjectComponentProps {
  projectName: string;
  clientName?: string;
    deadline?: string;
    status: ProjectStatus;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({
  projectName,
  clientName,
  deadline,
  status,
}) => {
  return (
      <div className="project-component max-w-sm bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <h2>{projectName}</h2>
      <p>
        <strong>Client:</strong> {clientName}
      </p>
      <p>
        <strong>Deadline:</strong> {deadline}
      </p>
      <p>
        <strong>Stat dddus:</strong> {status}
      </p>
    </div>
  );
};

export default ProjectComponent;