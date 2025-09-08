import DollarIcon  from '@mui/icons-material/AttachMoney'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import SpeedIcon from '@mui/icons-material/Speed';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalShippingIcon  from '@mui/icons-material/LocalShipping'
import DateIcon  from '@mui/icons-material/CalendarToday'
import ThumbIcon  from '@mui/icons-material/DragIndicator'
import { CircularProgress } from '@mui/material'
import type { PropsWithChildren } from 'react'

type FloatingTicketProps = PropsWithChildren< {
  
   label : string,
   iconType? : "money"|"delivery"|"performance",
   value?:string,
   sub?: string,
}>


const RoadmapWidth = 200
const daysOfWeek = ["Su","Mo","Tu","We","Th","Fr","Sa"]
export const FloatingTicket : React.FC<FloatingTicketProps> = ({label, iconType, value, sub, children})=>{


   return (
    <div className="flex flex-col items-stretch">
        <div className='dark:bg-[#0B101C]  p-4 flex flex-row gap-4'>
            <div className="border-radius-50 flex-col flex items-center justify-center text-gray-500 "><ThumbIcon></ThumbIcon></div>
            <div>{label}  </div>

        </div>
        <div className='dark:bg-[#111928] flex flex-row gap-4 items-center p-4'>
            {!!iconType?<div className="border-radius-50 flex flex-col items-center justify-center w-12 text-white rounded-full h-12 bg-gray-800">
              
                 { iconType=="delivery"? <DateIcon  sx={{color:"inherit",fill:1}}></DateIcon>
                    : iconType=="money"? <DollarIcon sx={{color:"inherit"}}></DollarIcon>
                    : iconType=="performance"? <ShowChartIcon sx={{color:"inherit"}}></ShowChartIcon>
                    : null}

            </div>:null}
            <div className='flex flex-col flex-1'>
                <div className='text-lg font-bold'>{value}</div>
                {children}
                {sub? <div className='text-lg text-gray-500 font-semibold'>{sub}</div>:null}

            </div>


        </div>
  
    </div>
    )
}