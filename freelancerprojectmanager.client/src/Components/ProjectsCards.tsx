import React from 'react';
import ProjectComponent from './ProjectComponent';
import type { Project } from '../Model/Project';
import { ToggleButtonGroup } from '@mui/material';



interface ProjectsCardsProps {
  projects: Project[]|undefined;
    onSelectProject?: (project: Project) => void;
    handleCreate: ()=> void;
}

const ProjectsCards: React.FC<ProjectsCardsProps> = ({ projects, onSelectProject, handleCreate }) => {
  if (!projects || projects.length === 0) {
      return  null;
  }
   
    
  return (
     <div className="bg-t rounded dark:bg-t m-4 p-6 text-gray-800 dark:text-gray-200">
                
           
               
          
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {projects.map(project => (
                      <ProjectComponent projectId={project.id} clientName={project.clientName} projectName={project.name} description={project.description} status={project.status}
                          key={project.id} project={project}
                          
                      >

                      </ProjectComponent>
                  ))}

              </div>
              
    
            </div>
    
  );
};

export default ProjectsCards;