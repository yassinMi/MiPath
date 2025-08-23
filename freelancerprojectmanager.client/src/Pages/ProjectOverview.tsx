import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import { Button, Card, CircularProgress, LinearProgress, linearProgressClasses, Paper, styled } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit'
import NoteIcon from '@mui/icons-material/NoteAlt'
import TasksIcon from '@mui/icons-material/Task'
import InfoIcon from '@mui/icons-material/Info'
import ControlPanelLayout from '../ControlPanelLayout';
import { SplitButton } from './ProjectsPage';
import { Link } from 'react-router-dom';

import ShowAllIcon from '@mui/icons-material/ChevronRight'
import type { LocationState } from '../Model/LocationState';
import CompactTasksPreview from '../Components/CompactsTasksPreview';


const PaperM = styled(Paper)(({theme})=> ({
          backgroundColor: '#ffffffff',
          ...theme.applyStyles('dark', {
            backgroundColor: 'var(--color-gray-900)',
          }),
        }));


interface ProjectOverviewProps {
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
   height: 10,
   borderRadius: 5,
   [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
         backgroundColor: theme.palette.grey[800],
      }),
   },
   [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
         backgroundColor: '#308fe8',
      }),
   },
}));

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ }) => {

   const { projectId } = useParams();
   const [project, setProject] = useState<Project | null>(null)
   const [editabledDescription, setEditabledDescription] = useState<string | undefined>(undefined)

   const eff = useEffect(() => {

      let ignored = false;
      const project = fetch(`/api/project/${projectId}`).then((r) => {
         r.json().then(r => {
            if (!ignored) {
               setProject(r)
               setEditabledDescription(r.description)
            }

         });

      });
      return () => {
         setProject(null)
         setEditabledDescription(undefined)
         ignored = true;
      }
   }
      , [projectId])

   return (
      <div className='flex flex-1 flex-col gap-2'>
         <ControlPanelLayout>
            <div className='flex mx-2 mb-0 flex-row gap-1'>
               <h1 className='text-xl font-bold'>{project?.name}</h1>
            </div>
            <SplitButton sx={{}} options={["Close As Complete", "Close As Canceled"]}></SplitButton>
         </ControlPanelLayout>

         <div className="flex flex-1 h-full flex-row gap-2 p-6 mx-4 items-stretch" >
            <div className='flex-1 flex flex-col gap-4'>
               <PaperM sx={{backgroundColor:"1c1c1c02"}} className='card-paper-m flex-1 h-1/3 max-h-[48ch]'>
                  <div className='card-header-m'>
                     {/* <div className='bg-blue-200/20 text-blue-600 flex justify-center items-center rounded-lg size-8'>
                        <TasksIcon className='size-4 ' ></TasksIcon>
                     </div> */}
                                          <TasksIcon fontSize='large'></TasksIcon>

                     <span>Tasks</span>
                    
                  </div>
                  <div className=' card-separator-m'></div>
                  <div className='m-4 flex flex-col items-center'>

                     <BorderLinearProgress className='self-stretch' variant="determinate" value={25} />
                     <div className=''>task1</div>

                  </div>
                  <div className='flex flex-1 flex-row items-stretch min-h-0 overflow-hidden'>
                     <div className='properties bg-green-500 flex-1 h-1/2'>
                        <div className='max-h-100'>hi</div>
                     </div>
                     <div className='tasksPreview flex-1 h-1/2 bg-yellow-400'>
                           <CompactTasksPreview></CompactTasksPreview>
                     </div>
                  </div>
                  <div className='card-separator-m'></div>
                  <div className='card-footer h-12 px-4 flex flex-row justify-end items-center'>
                     
                      <Link state={{ pageType: "projectTasks", projectId: project?.id, projectName: project?.name, projectStatus: project?.status } as LocationState} to={`/project/${project?.id}/tasks`}>
                        <Button variant='text'>
                           Show all
                        <ShowAllIcon></ShowAllIcon>

                        </Button>
                     </Link>
                  </div>
               </PaperM>
               <PaperM className='card-paper-m flex-1 flex1 h-1/3'>
                  <div className='card-header-m'>
                     <InfoIcon fontSize='large'></InfoIcon>
                     <span>Info</span>
                  </div>
                                 <div className='card-separator-m'></div>
                  <div>
                     <div>Client:</div>
                     <div>{project?.clientName}</div>
                  </div>

               </PaperM>
              
            </div>
            <PaperM  className='card-paper-m '>
               <div className='card-header-m'>
                  <NoteIcon fontSize='large'></NoteIcon>
                  <span>Notes</span>
               </div>
               <div className='card-separator-m'></div>
               <div style={{ padding: "8px", height: "100%" }}>

                  <textarea  onChange={(e) => setEditabledDescription(e.target.value)} value={editabledDescription} className='h-full w-full outline-none resize-none'></textarea>
               </div>
            </PaperM>



         </div>
      </div>


   );
};

export default ProjectOverview;