import React from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import KanbanBoard from '../Components/KanbanBoard';
import { usePTasks } from '../hooks';
import { CircularProgress } from '@mui/material';



interface ProjectTasksProps {
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({  }) => {
  
   const { projectId } = useParams(); 

    const {data:pTasks, isLoading:isLoadingPTasks, error:errorPTasks} = usePTasks({projectID:Number(projectId),orderByProperty:"CreatedAt",isDescending:true})
  return (
     <div >
                
           
               
          
           project tasks {projectId}
           <div>
            {isLoadingPTasks?<div><CircularProgress></CircularProgress></div>:null
            }
            {errorPTasks? <div className='text-red-500'>Error loading : {(errorPTasks as Error)?.message} </div>:null}
               {pTasks&&
            <KanbanBoard tasks={pTasks}></KanbanBoard>}
           </div>
    
            </div>
    
  );
};

export default ProjectTasks;