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


type CompactTaskItemProps  ={
   task:PTask
}& React.HTMLAttributes<HTMLDivElement>
export const CompactTaskItem: React.FC<CompactTaskItemProps> = ({task:t, onClick})=>{


    let idStr = "task-compact-"+t.id.toString()

    
    const handlePopoverClose = ()=>{

    }


    return (
<>
                <div onClick={onClick} key={t.id} className="flex flex-row items-center group gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-800  rounded cursor-pointer">
                {t.status=="Done"?<CheckedIcon fontSize="small" color="success"></CheckedIcon>:
                t.status=="InProgress"?<UncheckedIcon fontSize="small" sx={{color:"orange"}}></UncheckedIcon>
                :t.status=="Canceled"?<UncheckedIcon fontSize="small" sx={{color:"gray"}}></UncheckedIcon>
                :<UncheckedIcon fontSize="small" sx={{color:"gray"}}></UncheckedIcon>
            }
                <div title={t.title} className="truncate flex-1">{t.title}</div>
                <CevronRightIcon className="opacity-0 group-hover:opacity-100" fontSize="small" ></CevronRightIcon>

                </div>
               
                </>
    )
}

const tasks = ['Research competitors','Wireframe homepage','Review color palette','Initial scoping','Draft layout','Implement dark mode','Responsive design','Data cleaning','Create sample charts','PDF export setup','Vendor contract review','Shipment data analysis']; 
export interface CompactTasksPreviewProps {
 pTasks:PTask[],
 onTaskStateChangeRequested:(taskId: number, intent:PTaskStatus)=>void

}
const CompactTasksPreview : React.FC<CompactTasksPreviewProps> = ({pTasks, onTaskStateChangeRequested})=>{


const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, taskId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId)

  };
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  const handlePopoverClose = () => {
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

    return <div className="flex flex-col gap-0 p-0">
            {pTasks.map(t=>(
                <CompactTaskItem onClick={(e)=>{handlePopoverOpen(e, t.id)}} key={t.id} task={t}></CompactTaskItem>
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
  <div className="p-1 flex items-stretch flex-col gap-2">
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
  </ColoredBox>

  </Popover>
    </div>
}

export default CompactTasksPreview