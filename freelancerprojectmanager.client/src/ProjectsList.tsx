import React from 'react';
import type { Project } from './Model/Project';



interface ProjectsListProps {
  projects: Project[]|undefined;
    onSelectProject?: (project: Project) => void;
    handleCreate: ()=> void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onSelectProject, handleCreate }) => {
  if (!projects || projects.length === 0) {
      return  <div>
          <div>No projects found.</div>
          <button onClick={handleCreate} >create new</button>
      </div>;
  }
   
    
  return (
    <div>
          <h2>Projects</h2>
          <div>
              <button onClick={handleCreate} >create new</button>          </div>
      <ul>
        {projects.map(project => (
          <li
            key={project.id}
            style={{ cursor: onSelectProject ? 'pointer' : 'default', marginBottom: '1rem' }}
            onClick={() => onSelectProject && onSelectProject(project)}
          >
            <strong>{project.name}</strong>
            {project.description && <div>{project.description}</div>}
            {project.status && <span>Status: {project.status}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;