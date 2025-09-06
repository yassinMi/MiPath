import type React from "react";

import CheckedIcon from '@mui/icons-material/CheckCircle'
import UncheckedIcon from '@mui/icons-material/CheckCircle'
import CevronRightIcon from '@mui/icons-material/ChevronRight'
import type { PTask, PTaskStatus } from "../Model/PTask";
import { Box, Button, Popover, styled } from "@mui/material";
import { useState, type ReactElement, type ReactHTMLElement } from "react";


import PlayIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo'; 
import BackIcon from '@mui/icons-material/ArrowBack';
import PauseIcon from '@mui/icons-material/Pause';
import { CompactTaskItem } from "./CompactTaskItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { apiUpdateTaskDueDate, apiUpdateTaskPlannedStart } from "../services/api";
import { useSnackbar } from "./SnackbarContext";
import { useQueryClient } from "@tanstack/react-query";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); 
export const ColoredBox = styled(Box)(({theme})=>({

  
  backgroundColor: 'var(--color-gray-100)',
  border: '1px solid',
  borderRadius: 8,


  p: 3,
  ...theme.applyStyles('dark', {
      backgroundColor: "var(--color-gray-900)",
      borderColor: "var(--color-gray-700)",
    })

}));;




const tasks = ['Research competitors','Wireframe homepage','Review color palette','Initial scoping','Draft layout','Implement dark mode','Responsive design','Data cleaning','Create sample charts','PDF export setup','Vendor contract review','Shipment data analysis']; 
export interface CompactTasksPreviewProps {
 pTasks:PTask[],
 onTaskStateChangeRequested:(taskId: number, intent:PTaskStatus)=>void

}
const CompactTasksPreview : React.FC<CompactTasksPreviewProps> = ({pTasks, onTaskStateChangeRequested})=>{

type PopoverMode = "markas"|'set-due'|'set-planned-start'
const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
const [popoverMode, setPopoverMode] = useState<PopoverMode>('markas')
  const [dueDateValue, setDueDateValue] = useState<Dayjs|null>(dayjs());
  const [plannedStartValue, setPlannedStartValue] = useState<Dayjs|null>(dayjs());
  const queryClient = useQueryClient()
  const {showSnackbar} = useSnackbar()
  const handlePopoverOpen = (target: HTMLElement, taskId: number,mode: PopoverMode) => {
    console.log("handle popover open",taskId, mode, target )
    setAnchorEl(target);
    setSelectedTaskId(taskId)
    setPopoverMode(mode)
    var task = pTasks.find(t=>t.id==taskId);
    if(!task) throw new Error("cannot find task in the list")
    setDueDateValue(task.dueDate===undefined?null: dayjs( task.dueDate,{utc:true}))
    setPlannedStartValue(task.plannedStart===undefined?null: dayjs( task.plannedStart, {utc:true}))

  };
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  const handlePopoverClose = () => {
    console.log("handle popover close")
    setAnchorEl(null);
    setSelectedTaskId(null)
  };
 const open = Boolean(anchorEl);

 const handleInProgressClick = ()=>{
      if(selectedTaskId==null) return;
      handlePopoverClose()
      onTaskStateChangeRequested(selectedTaskId, "InProgress")

 }
 const handleTodoClick = ()=>{
 if(selectedTaskId==null) return;
       handlePopoverClose()

      onTaskStateChangeRequested(selectedTaskId, "ToDo")
 }
const handleDoneClick = ()=>{
 if(selectedTaskId==null) return;
       handlePopoverClose()

      onTaskStateChangeRequested(selectedTaskId, "Done")
}
const onDueDateValueChangeRequest = async(date:Dayjs|null)=>{
    date?.utc()
    setDueDateValue(date);
    if(!selectedTaskId) throw new Error("no task selected")
      var task = pTasks.find(t=>t.id==selectedTaskId);
    if(!task) throw new Error("cannot find task in the list")
    var newDueDate = date?.toDate()??undefined
    await apiUpdateTaskDueDate({id:selectedTaskId!,dueDate:newDueDate })
    task.dueDate = newDueDate
        queryClient.invalidateQueries({queryKey:["task",selectedTaskId]})
   showSnackbar("Updated task due date", "success")
}
const onPlannedStartValueChangeRequest = async(date:Dayjs|null)=>{
      date?.utc()

   setPlannedStartValue(date);
    if(!selectedTaskId) throw new Error("no task selected")
       var task = pTasks.find(t=>t.id==selectedTaskId);
    if(!task) throw new Error("cannot find task in the list")
      console.log("setting date to", date)
          var newplannedStart = date?.toDate()??undefined
    await apiUpdateTaskPlannedStart({id:selectedTaskId!,plannedStart:newplannedStart})
    task.plannedStart = newplannedStart
    queryClient.invalidateQueries({queryKey:["task",selectedTaskId]})

   showSnackbar(`Updated task planned Start: ${newplannedStart?.toUTCString()}`, "success")
}

    return <div className="flex flex-col gap-0 p-0">
            {pTasks.map(t=>(
                <CompactTaskItem onClick={(e)=>{handlePopoverOpen(e.currentTarget, t.id, "markas")}}
                onSetDueDateClick={(e)=>{handlePopoverOpen(e, t.id, "set-planned-start")}}
                onSetPlannedStartClick={(e)=>{handlePopoverOpen(e, t.id, "set-due")}}
                 key={t.id} task={t}></CompactTaskItem>
            ))}

 <Popover color="red" 
   slotProps={{paper:{
    
          sx: {
            backgroundColor: "unset",
            backgroundImage:"unset",
            boxShadow: "none", 
          },
          
        
   }, transition:{
     timeout:0,
     
   }}}
  
  id={"idStr"}
  
  open={open}
  anchorEl={anchorEl}
  onClose={handlePopoverClose}
  anchorOrigin={{
    vertical: 'center',
    horizontal: 'right',
  }} transformOrigin={{
    vertical: 'center',
    horizontal: 'left',
  }}
>
  <ColoredBox className="overflow-clip">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  {popoverMode=="markas"?<div className="p-1 flex items-stretch flex-col gap-2">
    <Button sx={{ textTransform: "none" }} onClick={handleTodoClick} className="flex flex-row !justify-start gap-2" color="warning">
            <BackIcon sx={{ fontSize: 16 }}></BackIcon>

      To do
    </Button>
    <Button sx={{ textTransform: "none" }} onClick={handleInProgressClick} className="flex flex-row !justify-start gap-2" color="info">
            <PlayIcon sx={{ fontSize: 16 }}></PlayIcon>

      In Progress
    </Button>
    <Button sx={{ textTransform: "none" }} onClick={handleDoneClick} className="flex flex-row !justify-start gap-2" color="success">
            <CheckIcon sx={{ fontSize: 16 }}></CheckIcon>

      Done
    </Button>

  </div>
  :popoverMode=="set-due"?<div id="popover-with-mode" className=" p-1 flex items-stretch p-4 flex-col gap-2"> <DateTimePicker
        label="Select due date"
        value={dueDateValue}
        
        closeOnSelect ={false}
        onChange={(newValue) => newValue&& setDueDateValue(newValue)}
        onAccept={(newValue) => newValue&& onDueDateValueChangeRequest(newValue)}
      /></div>  
  :popoverMode=="set-planned-start"?<div className="p-1 flex items-stretch p-4 flex-col gap-2"><DateTimePicker
        label="Select planned start"
        value={plannedStartValue}
        
        closeOnSelect ={false}
        onChange={(newValue) => newValue&& setPlannedStartValue(newValue)}
        onAccept={(newValue) => newValue&& onPlannedStartValueChangeRequest(newValue)}

      /></div>  
  :null
}
</LocalizationProvider>
  </ColoredBox>

  </Popover>
    </div>
}

export default CompactTasksPreview