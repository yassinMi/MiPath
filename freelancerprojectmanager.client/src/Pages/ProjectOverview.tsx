import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Card, CircularProgress, Input, LinearProgress, linearProgressClasses, Modal, Paper, Snackbar, styled, TextField } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit'
import NoteIcon from '@mui/icons-material/NoteAlt'
import TasksIcon from '@mui/icons-material/TaskSharp'
import InfoIcon from '@mui/icons-material/Info'
import ControlPanelLayout from '../Components/ControlPanelLayout';
import { SplitButton } from './ProjectsPage';
import { Link } from 'react-router-dom';

import ShowAllIcon from '@mui/icons-material/ChevronRight'
import PersonIcon from '@mui/icons-material/Person'
import type { LocationState } from '../Model/LocationState';
import CompactTasksPreview from '../Components/CompactsTasksPreview';
import { DatePicker, DesktopDatePicker, LocalizationProvider, type PickerValueType } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { useProjectPTasks } from '../hooks';
import type { ref } from 'process';
import { useProject } from '../hooks/useProject';
import AddTaskForm from '../Components/AddTaskForm';
import { apiAddTaske, apiCreateProject, apiFetchProject } from '../services/api';
import type { CreateTaskCommand } from '../Model/Commands';
import { truncateString } from '../services/utils';
import { useSnackbar } from '../Components/SnackbarContext';


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
         backgroundColor: "var(--color-gray-900)",
      }),
   },
   [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.success.main,
      ...theme.applyStyles('dark', {
         backgroundColor: theme.palette.success.light,
      }),
   },
}));

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ }) => {

   const { projectId } = useParams();
   /*const [project, setProject] = useState<Project | null>(null)*/
   const [startDate, setStartDate] = useState<PickerValue|undefined>(dayjs("2022-04-04"))
   const [editabledDescription, setEditabledDescription] = useState<string | undefined>(undefined)
   const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
   
    const {showSnackbar} = useSnackbar()  
   /*const {data: projectPTasks, isLoading:isLoadingProjectPTasks,error: errorProjectPTasks} = useProjectPTasks(projectId,{enabled:!!projectId});*/
   const {data: project_, isLoading:isLoadingProject_,error: errorProject_} = useProject(projectId,{enabled:!!projectId});


  const handleAddTaskModalOpen = () =>{
       
        setAddTaskModalOpen(true);
 
     }
     const handleAddTaskModalClose = () => {
 
       setAddTaskModalOpen(false);
 
     }
     const handleAddTaskSubmit = async (data:CreateTaskCommand) =>{
       console.log("handleAddTaskSubmit", data)
       //call api to create project
       try {
          const newProjId = await apiAddTaske(data);
          var truncatedTitle = truncateString(data.title || "Unnamed Task", 30);

            showSnackbar(`Added task: '${truncatedTitle}'`, "success")
          console.log("newProjId", newProjId)
         setAddTaskModalOpen(false);
         
        
       }
       catch(err){
         console.error("Error creating task", err)
         showSnackbar(`Error adding task: '${data.title}'`, "error")

       }
 
      
     
     }
     const handleSplitButtonClick = (index:number) => {
       
     }

   return (
      <div className='flex flex-1 flex-col gap-2 overflow-auto max-h-[calc(100vh-5rem)] '>
         <ControlPanelLayout className='flex-shrink-0 flex-grow-0 flex-wrap'>
            <div className='flex mx-2 mb-0 flex-row gap-1'>
               <h1 className='text-xl font-bold'>{project_?.name}</h1>
            </div>
            <div className='flex flex-row gap-2 ml-auto'>
                <Button onClick={handleAddTaskModalOpen} variant='contained' className='whitespace-nowrap' color='secondary'>Add Task</Button>
            <SplitButton sx={{}} options={["Close As Complete", "Close As Canceled"]}></SplitButton>
            </div>
           
         </ControlPanelLayout>

<Modal 
  open={addTaskModalOpen}
  onClose={handleAddTaskModalClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border rounded-lg p-6">
    {project_&&
      <AddTaskForm  projectId={project_.id}  onSubmit={handleAddTaskSubmit}/>
}
  </Box>
</Modal>
         <div className="flex flex-col md:flex-row flex-1 h-full min-h-80 overflow-auto  gap-2 p-6 mx-4 items-stretch" >
            <div className='flex-1 flex flex-col gap-4 overflow-auto'>
              {false &&<div className='flex flex-row gap-2 flex-wrap pb-1 overflow-auto h-auto flex-grow-0 flex-shrink-1 justify max-h-1/3'>
                  {/* <PaperM className='card-paper-m h-auto flex-grow-0 flex-shrink-1 max-h-1/3'>
                  <div className='card-header-m'>
                     <InfoIcon fontSize='large'></InfoIcon>
                     <span>Info</span>
                  </div>
                                 <div className='card-separator-m'></div>
                  <div>
                     <div>Client:</div>
                     <div>{project?.clientName}</div>
                  </div>

               </PaperM> */}

               <PaperM className='flex px-4 flex-row gap-2 flex-1 items-center'>
                        <PersonIcon></PersonIcon>
                   <div className='font-bold'>YassinMi</div>
               </PaperM>
                <PaperM className='flex px-4 flex-row gap-2  flex-1 items-center'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-gray-500'>Work hours</div>
                  <div className='font-bold text-amber-500'>54h</div>
               </div>
               </PaperM>
              
<PaperM className='flex px-4 flex-row gap-2  flex-1 items-center'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-blue-500/80'>Avg. rate</div>
                  <div className='font-bold text-blue-500'>4$/h</div>
               </div>
               </PaperM>
                            
<PaperM className='flex px-4 flex-row gap-2  flex-1 items-center'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-purple-500/80'>Progress</div>
                  <div className='font-bold text-purple-500'>4$/h</div>
               </div>
               </PaperM>
                            
<PaperM className='flex px-4 flex-row gap-2  flex-1 items-center'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-green-500/80'>Valuee</div>
                  <div className='font-bold text-green-500'>200$</div>
               </div>
               </PaperM>
               </div>
}
               
              
               <PaperM className='card-paper-m overflow-auto flex-1   '>
                  <div className='card-header-m text-gray-600 dark:text-gray-100'>
                     {/* <div className='bg-blue-200/20 text-blue-600 flex justify-center items-center rounded-lg size-8'>
                        <TasksIcon className='size-4 ' ></TasksIcon>
                     </div> */}
                                  <TasksIcon className=''  fontSize='large'></TasksIcon>

                     <span>Tasks</span>
                    
                  </div>
                   <div className='flex flex-row gap-2 m-4 flex-wrap pb-1 overflow-auto h-auto flex-grow-0 flex-shrink-1 justify max-h-1/3'>
                  {/* <PaperM className='card-paper-m h-auto flex-grow-0 flex-shrink-1 max-h-1/3'>
                  <div className='card-header-m'>
                     <InfoIcon fontSize='large'></InfoIcon>
                     <span>Info</span>
                  </div>
                                 <div className='card-separator-m'></div>
                  <div>
                     <div>Client:</div>
                     <div>{project?.clientName}</div>
                  </div>

               </PaperM> */}

               <div  className='flex px-4 flex-row gap-2 flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                        <PersonIcon></PersonIcon>
                   <div className='font-bold'>YassinMi</div>
               </div>
                <div className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-gray-500'>Work hours</div>
                  <div className='font-bold text-amber-500'>54h</div>
               </div>
               </div>
              
<div  className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-blue-500/80'>Avg. rate</div>
                  <div className='font-bold text-blue-500'>4$/h</div>
               </div>
               </div>
                            
<div  className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-purple-500/80'>Progress</div>
                  <div className='font-bold text-purple-500'>4$/h</div>
               </div>
               </div>
                            
<div  className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                       <div className='flex flex-col p-2'>
                  <div className='text-sm text-green-500/80'>Valuee</div>
                  <div className='font-bold text-green-500'>200$</div>
               </div>
               </div>
               </div>
               
                  <div className=' card-separator-m'></div>
                  <div className='m-4 mb-0 flex flex-shrink-0 flex-col items-center'>

                     <BorderLinearProgress className='self-stretch ' variant="determinate" value={25} />
                     <div className=''>task1</div>

                  </div>
                  <div className='flex flex-1 flex-row items-stretch overflow-auto m-4 gap-4 '>
                     <div className='properties overflow-auto gap-2 w-1/2 flex flex-col flex-1  p-2 border-1 border-gray-700 rounded-xl dark:bg-gray-900  '>
                        <h2>Properties</h2>
                        <div className='max-h-100 flex flex-col overflow-auto gap-2 text-sm '>hi
                           <div className='flex flex-row items-center'>
                              <label className='flex-1'>Client:</label>
                              <Input  className='flex-grow-0 w-20' placeholder="Name" aria-label='desc' />
                           </div>
                           <div className='flex flex-row items-center'>
                              <label className='flex-1'>Estimate Value:</label>
                              <Input  className='flex-grow-0 w-20' value={"200$"} placeholder="Value" aria-label='desc' />
                           </div>
                            <div className='flex flex-row items-center mt-4'>
                              {/* <label className='flex-1'>State Date:</label> */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
  label="Start Date"
  value={startDate}
  onChange={(newValue) => {setStartDate(newValue)}}
/>                              </LocalizationProvider>
                           </div>
                          
                           <div>property</div>
                        </div>
                     </div>
                     <div className='tasksPreview overflow-auto  p-2 border-1 flex flex-col items-stretch border-gray-700 flex-1 w-1/2 rounded-xl dark:bg-gray-900 text-sm'>
                           {isLoadingProject_ &&<div className='self-center justify-center flex-1 flex flex-col items-center '> <CircularProgress className=''></CircularProgress></div>}
                           {errorProject_ && <div className='text-red-500'>Error loading tasks</div>}
                           {!isLoadingProject_ && !errorProject_ && project_ &&
                           <CompactTasksPreview pTasks={project_.tasks!}></CompactTasksPreview>}
                           
                     </div>
                  </div>
                  <div className='card-separator-m'></div>
                  <div className='card-footer h-12 px-4 flex flex-row justify-end items-center'>
                     
                      <Link state={{ pageType: "projectTasks", projectId: project_?.id, projectName: project_?.name, projectStatus: project_?.status } as LocationState} to={`/project/${project_?.id}/tasks`}>
                        <Button variant='text'>
                           Show all
                        <ShowAllIcon></ShowAllIcon>

                        </Button>
                     </Link>
                  </div>
               </PaperM>
               
              
            </div>
            <PaperM  className='card-paper-m flex-1'>
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