import React from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';



interface ProjectOverviewProps {
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({  }) => {
  
   const { projectId } = useParams(); 

    
  return (
     <div >
                
           
               
          
           project overview {projectId}
    
            </div>
    
  );
};

export default ProjectOverview;