
import CheckedIcon from '@mui/icons-material/CheckCircle'
import UncheckedIcon from '@mui/icons-material/CheckCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CevronRightIcon from '@mui/icons-material/ChevronRight'
import type { PTask, PTaskStatus } from "../Model/PTask";
import { Box, Button, IconButton, Popover, styled, type IconButtonProps } from "@mui/material";
import React, { useState, type ReactElement, type ReactHTMLElement } from "react";


import PlayIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo'; 
import BackIcon from '@mui/icons-material/ArrowBack';
import PauseIcon from '@mui/icons-material/Pause';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { purple } from '@mui/material/colors';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const ColorIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  color: 'var(--color-gray-800)',
  backgroundColor: 'var(--color-gray-300)',
  boxShadow:"unset",
  '&:hover': {
    backgroundColor:"var(--color-gray-400)",
  },
  ...theme.applyStyles('dark', {
        color: 'var(--color-gray-100)',
      backgroundColor: "#ffffff07",
  '&:hover': {
    backgroundColor:"#ffffff20",
  },
   }),
}));

export type CompactTaskItemProps  ={
   task:PTask,
   onSetPlannedStartClick: (t:HTMLElement)=>void,
   onSetDueDateClick: (t:HTMLElement)=>void
}& React.HTMLAttributes<HTMLDivElement>
export const CompactTaskItem: React.FC<CompactTaskItemProps> = ({task:t, onClick, onSetPlannedStartClick, onSetDueDateClick})=>{


    let idStr = "task-compact-"+t.id.toString()

    
    const handlePopoverClose = ()=>{

    }

    const handleSetDueDateClick: React.MouseEventHandler<HTMLButtonElement> = (e)=>{
        e.stopPropagation()
        onSetDueDateClick(e.currentTarget.parentElement?.parentElement!)
    }
    const handleSetPlannedDateClick:React.MouseEventHandler<HTMLButtonElement>  = (e)=>{
        e.stopPropagation()
        onSetPlannedStartClick(e.currentTarget.parentElement?.parentElement!)
    }


    return (
<>
                <div onClick={onClick} key={t.id} className="flex flex-row items-center group gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 h-12 rounded cursor-pointer">
                {t.status=="Done"?<CheckedIcon fontSize="small" color="success"></CheckedIcon>:
                t.status=="InProgress"?<PlayCircleIcon fontSize="small" color='info' ></PlayCircleIcon>
                :t.status=="Canceled"?<UncheckedIcon fontSize="small" sx={{color:"gray"}}></UncheckedIcon>
                :<UncheckedIcon fontSize="small" sx={{color:"orange"}}></UncheckedIcon>
            }
                <div title={t.title} className="truncate flex-1">{t.title}</div>
                <div className='flex flex-row gap-1 items-center hidden group-hover:flex '>
 <ColorIconButton className='hidden group-hover:flex ' size="small" onClick={handleSetPlannedDateClick} >
      <AccessTimeIcon fontSize="small" />
    </ColorIconButton>
     <ColorIconButton className='hidden group-hover:flex ' size="small" onClick={handleSetDueDateClick} >
      <EventAvailableIcon fontSize="small" />
    </ColorIconButton>
    
                </div>
                    
    
                <CevronRightIcon className="opacity-0 group-hover:opacity-100" fontSize="small" ></CevronRightIcon>

                </div>
               
               </>
    )
}