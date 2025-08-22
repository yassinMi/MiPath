import React from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';



interface ProjectTasksProps {
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({  }) => {
  
   const { projectId } = useParams(); 

    
  return (
     <div >
                
           
               
          
           project tasks {projectId}
    
            </div>
    
  );
};

export default ProjectTasks;