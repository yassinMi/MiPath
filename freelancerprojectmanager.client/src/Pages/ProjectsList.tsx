import React from 'react';
import ProjectComponent from '../ProjectComponent';
import type { Project } from '../Model/Project';
import { ToggleButtonGroup } from '@mui/material';



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
     <div className="bg-gray-200 rounded dark:bg-gray-900 m-4 p-6 text-gray-800 dark:text-gray-200">
                
           
               
          
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {projects.map(project => (
                      <ProjectComponent clientName={project.clientName} projectName={project.name} status={project.status}
                          key={project.id}    
                          
                      >

                      </ProjectComponent>
                  ))}

              </div>
              
    
            </div>
    
  );
};

export default ProjectsList;