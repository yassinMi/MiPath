import React from 'react';
import type { Project } from './Model/Project';
import ProjectComponent from './ProjectComponent';



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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <button onClick={handleCreate} >create new</button>          </div>
          <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {projects.map(project => (
                      <ProjectComponent clientName={project.clientName} projectName={project.name} status={project.status}
                          key={project.id}
                          style={{ cursor: onSelectProject ? 'pointer' : 'default', marginBottom: '1rem' }}
                          onClick={() => onSelectProject && onSelectProject(project)}
                      >

                      </ProjectComponent>
                  ))}

              </div>
              
      </div>
    </div>
  );
};

export default ProjectsList;