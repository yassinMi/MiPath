import React, { useEffect, useState } from 'react';
import type { Project } from '../Model/Project';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Card, CircularProgress, Input, LinearProgress, linearProgressClasses, Modal, Paper, Snackbar, styled, TextField } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit'
import NoteIcon from '@mui/icons-material/NoteAlt'
import TasksIcon from '@mui/icons-material/TaskSharp'
import InfoIcon from '@mui/icons-material/Info'
import ControlPanelLayout from '../Components/ControlPanelLayout';
import { SplitButton, StyledBox } from './ProjectsPage';
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
import { apiAddTaske, apiCreateProject, apiFetchProject, apiFetchTask, apiMarkTaskAs, apiUpdateProjectInfo } from '../services/api';
import type { CreateTaskCommand, MarkAs } from '../Model/Commands';
import { truncateString } from '../services/utils';
import { useSnackbar } from '../Components/SnackbarContext';
import { useQueryClient } from '@tanstack/react-query';
import type { PTask, PTaskStatus } from '../Model/PTask';
import { ColorButton } from './HomeDashboard';
import ArrowRight from '@mui/icons-material/ChevronRight';



const PaperM = styled(Paper)(({ theme }) => ({
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
   const [startDate, setStartDate] = useState<PickerValue | undefined>(dayjs("2022-04-04"))
   const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

   const { showSnackbar } = useSnackbar()
   /*const {data: projectPTasks, isLoading:isLoadingProjectPTasks,error: errorProjectPTasks} = useProjectPTasks(projectId,{enabled:!!projectId});*/
   const { data: project_, isLoading: isLoadingProject_, error: errorProject_, refetch:refetchProject_ } = useProject(projectId, { enabled: !!projectId });
   const [editabledDescription, setEditabledDescription] = useState<string | undefined>(project_?.description)
   const [isEditabledDescriptionDirty, setIsEditabledDescriptionDirty] = useState<boolean>(false)
   const [editabledName, setEditabledName] = useState<string | undefined>(project_?.name)
   const [isEditingName, setIsEditingName] = useState<boolean>(false)


   useEffect(()=>{
     

   }, [editabledDescription,project_])
   useEffect(()=>{

      if(project_){
      setEditabledDescription( project_?.description)
      setEditabledName( project_?.name)

      }
   },[project_])
   const queryClient = useQueryClient();
   const handleAddTaskModalOpen = () => {

      setAddTaskModalOpen(true);

   }
   const handleAddTaskModalClose = () => {

      setAddTaskModalOpen(false);

   }
   const handleAddTaskSubmit = async (data: CreateTaskCommand) => {
      console.log("handleAddTaskSubmit", data)
      //call api to create project
      try {
         const newProjId = await apiAddTaske(data);
         var truncatedTitle = truncateString(data.title || "Unnamed Task", 30);

         showSnackbar(`Added task: '${truncatedTitle}'`, "success")

        /* queryClient.setQueryData(['project', projectId], (oldData: Project) => {
            if (!oldData) return oldData;
            return {
               ...oldData,
               tasks: oldData.tasks ? [...oldData.tasks, task] : [task],
            };

         });*/
         refetchProject_()
         


         console.log("newProjId", newProjId)
         setAddTaskModalOpen(false);


      }
      catch (err) {
         console.error("Error creating task", err)
         showSnackbar(`Error adding task: '${data.title}'`, "error")

      }



   }
   const handleSplitButtonClick = (index: number) => {

   }
   const getCompletedTasksCount = ()=>{
      if(!project_?.tasks) return -1
      return project_?.tasks?.filter(t=>t.status=="Done").length;
   }
   const getPlannedTaskCount = ()=>{
            if(!project_?.tasks) return -1
      return project_?.tasks?.filter(t=>t.status!=="Canceled").length;
   }
   const getProgressPercent = ()=>{
      if(!project_?.tasks?.length) return -1

      return 100* getCompletedTasksCount()/getPlannedTaskCount()
   }
   const handleTasStatusChangeRequested = async (taskid: number, newStatus: PTaskStatus)=>{
      var intent = "ToDo" as MarkAs
      if(newStatus=="Done") 
         {intent = "Completed"}
      else if(newStatus=="InProgress") 
         {intent = "InProgress"}
      else if(newStatus=="ToDo") 
         {intent = "ReOpen"}
      else{ 
         showSnackbar("unknown intent", "error")
      }
      try {
           await apiMarkTaskAs({id: taskid,intent:intent})
                  showSnackbar("updated ", "success")
         
 queryClient.setQueryData(['project', projectId], (oldData: Project) => {
            if (!oldData) return oldData;
            var task = oldData.tasks?.find(t=>t.id==taskid)
            if(task){
               task.status = newStatus;
            }
            else{
               return oldData;
            }
           
            return {
               ...oldData,
              
            };

         });
         console.log("invalidating today")
            queryClient.invalidateQueries({queryKey:["today"]})
            await queryClient.refetchQueries({ queryKey: ["today"] });

      } catch (error) {
                  showSnackbar("failed to update task status: "+error, "error")
      }
   }



   const onDescriptionChange = (value: string)=>{
      setEditabledDescription(value)
     setIsEditabledDescriptionDirty(true)
   }
   const onSaveDescriptionClick = async()=>{
      if(!projectId) throw new Error("no project id")
      await apiUpdateProjectInfo({id:Number(projectId)!, description:editabledDescription??"",name:project_?.name??"-"})
      queryClient.invalidateQueries({queryKey:["project",projectId]})
      showSnackbar("Updated project description", "success")
      setIsEditabledDescriptionDirty(false)
   }
   const onSaveTitle = async ()=>{
      setIsEditingName(false);
      if(!projectId) throw new Error("no project id")
      await apiUpdateProjectInfo({id:Number(projectId)!, description:project_?.description??"",name:editabledName??""})
      queryClient.invalidateQueries({queryKey:["project",projectId]})
      showSnackbar("Updated project name", "success")
   }

   return (
      <div className='flex flex-1 flex-col gap-2 overflow-auto max-h-[calc(100vh-5rem)] '>
         <ControlPanelLayout className='flex-shrink-0 flex-grow-0 flex-wrap'>
            <div className='flex mx-2 mb-0 flex-row gap-1'>
            {isEditingName?<input autoFocus
      value={editabledName}
      onChange={(e) => setEditabledName(e.target.value)}
      onBlur={() => onSaveTitle()}
      onKeyDown={(e) => e.key === "Enter" && onSaveTitle()}></input>:<h1 onClick={() => setIsEditingName(true)} className={(`text-xl font-bold ${!project_?.name?"italic opacity-40":""}`)}>{project_?.name? project_.name:"Untitled"}</h1> }
               
            </div>
            <div className='flex flex-row gap-2 ml-auto'>
               <Button title="Add a task for this project" onClick={handleAddTaskModalOpen} variant='contained' className='whitespace-nowrap' color='secondary'>Add Task</Button>
               <SplitButton sx={{}} options={["Close As Complete", "Close As Canceled"]}></SplitButton>
            </div>

         </ControlPanelLayout>

         <Modal
            open={addTaskModalOpen}
            onClose={handleAddTaskModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <StyledBox >
               {project_ &&
                  <AddTaskForm projectId={project_.id} onSubmit={handleAddTaskSubmit} />
               }
            </StyledBox>
         </Modal>
         <div className="flex flex-col md:flex-row flex-1 h-full min-h-80 overflow-auto  gap-2 p-6 mx-4 items-stretch" >
            <div className='flex-1 flex flex-col gap-4 overflow-auto'>
              


               <PaperM className='card-paper-m overflow-auto flex-1   '>
                  <div className='card-header-m text-gray-600 dark:text-gray-100'>
                     {/* <div className='bg-blue-200/20 text-blue-600 flex justify-center items-center rounded-lg size-8'>
                        <TasksIcon className='size-4 ' ></TasksIcon>
                     </div> */}
                     <TasksIcon className='' fontSize='large'></TasksIcon>

                     <span>Tasks</span>
                     
                      <Link className='ml-auto' state={{ pageType: "projectTasks", projectId: project_?.id, projectName: project_?.name, projectStatus: project_?.status } as LocationState} to={`/project/${project_?.id}/tasks`}>
                         <ColorButton  variant="contained" color="success" onClick={()=>{
                                              
                                           }}>Show all
                                           <ArrowRight sx={{transition:"all 200ms ease-in-out"}} className=" group-hover:translate-x-1 "></ArrowRight>
                                           </ColorButton>
                       
                     </Link>

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

                     <div className='flex px-4 flex-row gap-2 flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                        <PersonIcon></PersonIcon>
                        <div className='font-bold'>{(project_?.client?.name??"YassinMi")}</div>
                     </div>
                     <div className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                        <div className='flex flex-col p-2'>
                           <div className='text-sm text-amber-500'>Work hours</div>
                           <div className='font-bold text-amber-500'>-</div>
                        </div>
                     </div>

                     <div className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                        <div className='flex flex-col p-2'>
                           <div className='text-sm text-purple-500/80'>Avg. rate</div>
                           <div className='font-bold text-purple-500'>-</div>
                        </div>
                     </div>

                     <div className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                        <div className='flex flex-col p-2'>
                           <div className='text-sm text-green-500/80'>Progress</div>
                           <div className='font-bold text-green-500'>{getCompletedTasksCount()}/{getPlannedTaskCount()}</div>
                        </div>
                     </div>

                     <div className='flex px-4 flex-row gap-2  flex-1 items-center bg=gray-100 dark:bg-gray-900 shadow rounded'>
                        <div className='flex flex-col p-2'>
                           <div className='text-sm text-blue-500/80'>Value</div>
                           <div className='font-bold text-blue-500'>200$</div>
                        </div>
                     </div>
                  </div>

                  <div className=' card-separator-m'></div>
                  <div className='m-4 mb-0 flex flex-shrink-0 flex-col items-center'>

                     <BorderLinearProgress className='self-stretch ' variant="determinate" value={getProgressPercent()} />
                     {getProgressPercent()!==-1&&<div className=''>{getProgressPercent().toFixed(0)}%</div>}

                  </div>
                  <div className='flex flex-1 flex-row items-stretch overflow-auto m-4 gap-4 '>
                     <div className='properties overflow-auto gap-2 w-1/2 flex flex-col flex-1  p-2 border-1 border-gray-700 rounded-xl dark:bg-gray-900  '>
                        <h2>Properties</h2>
                        <div>this section is not implemnted : view and set properties e.g. estimated value, hours, due date </div>
                        {false &&<div className='max-h-100 flex flex-col overflow-auto gap-2 text-sm '>hi
                           <div className='flex flex-row items-center'>
                              <label className='flex-1'>Client:</label>
                              <Input className='flex-grow-0 w-20' placeholder="Name" aria-label='desc' />
                           </div>
                           <div className='flex flex-row items-center'>
                              <label className='flex-1'>Estimate Value:</label>
                              <Input className='flex-grow-0 w-20' value={"200$"} placeholder="Value" aria-label='desc' />
                           </div>
                           <div className='flex flex-row items-center mt-4'>
                              {/* <label className='flex-1'>State Date:</label> */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => { setStartDate(newValue) }}
                                 />                              </LocalizationProvider>
                           </div>

                           <div>property</div>
                        </div>}
                     </div>
                     <div className='tasksPreview overflow-auto  p-2 border-1 flex flex-col items-stretch border-gray-700 flex-1 w-1/2 rounded-xl dark:bg-gray-900 text-sm'>
                        {isLoadingProject_ && <div className='self-center justify-center flex-1 flex flex-col items-center '> <CircularProgress className=''></CircularProgress></div>}
                        {errorProject_ && <div className='text-red-500'>Error loading tasks</div>}
                        {!isLoadingProject_ && !errorProject_ && project_ &&
                           <CompactTasksPreview onTaskStateChangeRequested={handleTasStatusChangeRequested} pTasks={project_.tasks!}></CompactTasksPreview>}

                     </div>
                  </div>
                  <div className='card-separator-m'></div>
                  {/* <div className='card-footer h-12 px-4 flex flex-row justify-end items-center'>

                    
                  </div> */}
               </PaperM>


            </div>
            <PaperM className='card-paper-m flex-1'>
               <div className='card-header-m'>
                  <NoteIcon fontSize='large'></NoteIcon>
                  <span>Notes</span>
                  {isEditabledDescriptionDirty&& project_?.description!==editabledDescription&&  <div className='ml-auto' >
 <ColorButton  variant="contained" color="success" onClick={onSaveDescriptionClick}>Save Description
                                           </ColorButton>
                  </div> }
               
                        
                       
               </div>
               <div className='card-separator-m'></div>
               <div style={{ padding: "8px", height: "100%" }}>

                  <textarea placeholder='Write notes' onChange={(e) => onDescriptionChange(e.target.value)} value={editabledDescription} className='h-full w-full outline-none resize-none'></textarea>
               </div>
            </PaperM>



         </div>

      </div>


   );
};

export default ProjectOverview;