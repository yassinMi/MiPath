import React from 'react';

interface ProjectComponentProps {
  projectName: string;
  clientName: string;
  deadline: string;
  status: string;
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({
  projectName,
  clientName,
  deadline,
  status,
}) => {
  return (
    <div className="project-component">
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