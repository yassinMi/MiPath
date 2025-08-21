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
      <div className="project-component h-48  flex flex-col gap-4 max-w-sm bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="project-card-header h-4 m-4" >
              <h3 className="text-lg">{projectName}</h3>
          </div>
          <div className="separator h-px bg-gray-300 dark:bg-gray-900 mx-4"></div>
          <div className="project-card-body flex-1 " ></div>
          <div className="separator h-px bg-gray-300 dark:bg-gray-900 mx-4"></div>
          <div className="project-card-footer h-4 m-4" >

          </div>
    </div>
  );
};

export default ProjectComponent;