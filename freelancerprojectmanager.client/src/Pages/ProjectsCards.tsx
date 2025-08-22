import React from 'react';
import ProjectComponent from '../ProjectComponent';
import type { Project } from '../Model/Project';
import { ToggleButtonGroup } from '@mui/material';



interface ProjectsCardsProps {
  projects: Project[]|undefined;
    onSelectProject?: (project: Project) => void;
    handleCreate: ()=> void;
}

const ProjectsCards: React.FC<ProjectsCardsProps> = ({ projects, onSelectProject, handleCreate }) => {
  if (!projects || projects.length === 0) {
      return  <div>
          <div>No projects found.</div>
          <button onClick={handleCreate} >create new</button>
      </div>;
  }
   
    
  return (
     <div className="bg-gray-200 dark:bg-gray-800 p-6 text-gray-800 dark:text-gray-200">
                
           
               
          
              <div className="grid grid-cols-1 4 gap-6">
                  {projects.map(project => (
                     <div>{project.name}</div>
                  ))}

              </div>
              
    
            </div>
    
  );
};

export default ProjectsCards;