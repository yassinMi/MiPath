import React from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import KanbanBoard from '../Components/KanbanBoard';
import { usePTasks } from '../hooks';
import { Button, CircularProgress } from '@mui/material';
import ControlPanelLayout from '../Components/ControlPanelLayout';
import { SplitButton } from './ProjectsPage';
import { useProject } from '../hooks/useProject';



interface ProjectTasksProps {
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({  }) => {
  
   const { projectId } = useParams(); 
  const {data: project_, isLoading:isLoadingProject_,error: errorProject_} = useProject(Number(projectId),{enabled:!!projectId});
    const {data:pTasks, isLoading:isLoadingPTasks, error:errorPTasks} = usePTasks({projectID:Number(projectId),orderByProperty:"CreatedAt",isDescending:true})
  return (
     <div className='flex flex-1 flex-col gap-2 overflow-auto max-h-[calc(100vh-5rem)]' >
                 <ControlPanelLayout className='flex-shrink-0 flex-grow-0 flex-wrap'>
                            <div className='flex mx-2 mb-0 flex-row gap-1'>
                               <h1 className='text-xl font-bold'>{project_?.name}</h1>
                            </div>
                            <div className='flex flex-row gap-2 ml-auto'>
                                <Button onClick={()=>{}} variant='contained' className='whitespace-nowrap' color='secondary'>Add Task</Button>
                            <SplitButton sx={{}} options={["Close As Complete", "Close As Canceled"]}></SplitButton>
                            </div>
                           
                         </ControlPanelLayout>
           
               
          
          
           <div>
            {isLoadingPTasks?<div><CircularProgress></CircularProgress></div>:null
            }
            {errorPTasks? <div className='text-red-500'>Error loading : {(errorPTasks as Error)?.message} </div>:null}
               {pTasks&&
            <KanbanBoard showProjectNames={false} tasks={pTasks}></KanbanBoard>}
           </div>
    
            </div>
    
  );
};

export default ProjectTasks;