import React, { useEffect, useState } from "react";
import { useRoadmapOverview } from "../hooks/useRoadmap";
import type { PTask } from "../Model/PTask";

interface DayLabelProps {
   x:number,
   y:number,
   label: string
}
interface DayOfWeekCellProps {
   x:number,
   y:number,
   status : "green"|"gray",
   width:number,
      tasksStatuses:TaskStatusInDayOfWeek[],
      hasDeliveries : boolean
      progressRatio : number

}
interface CellIconProps {
  
   y: number,
   x: number,
   ringPercent : number,

}
type TaskStatusInDayOfWeek = "done"|"todo"|"missed"
interface DayOfWeek {
   dayIndex : number
   progressRatio: number
   hasDeliveries:boolean
   tasksStatuses: TaskStatusInDayOfWeek[]


}
const SETTINGS_DAY_START_HOUR = 8;
const RoadmapWidth = 200
const daysOfWeek = ["Su","Mo","Tu","We","Th","Fr","Sa"]
const DeliveryIcon : React.FC<CellIconProps> = ({x,y})=>{


   return (<>
   <svg xmlns="http://www.w3.org/2000/svg" y={y-2.3} x={x-2.3} height="5" viewBox="0 -960 960 960" width="5" >
      <path fill="#b039f7" d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240Zm480 0q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120Z"/>
      </svg>
      <circle cx={x} cy={y}  r={4} fill="none" stroke="#b039f7" strokeWidth={1} ></circle>
</>)
}


const DayOfWeekCell : React.FC<DayOfWeekCellProps> = ({x, y, status,width,tasksStatuses, hasDeliveries, progressRatio})=>{

    const [statusS, setStatusS] = useState(status)

    const raduis = ((RoadmapWidth/24)/2)-0.5


     
   return (<g><rect
             style={{fill: statusS=="gray"?'#11192800': 'url(#swatch15)', fillOpacity: 1, strokeWidth: 3.32833, transition:"all 0.5s ease"}}
             
             width={width-4}
             height={width-4}
             x={x - (width/2) +2}
             y={y}
             rx="1"
             ry="1" />
             {Array.from({length:24},(_,i)=>i).map(i=>{
               var ts = tasksStatuses.length>=i? tasksStatuses[i]:undefined;
               if(!ts) return null;
               var y_ix = Math.round(i/6)
               var dotWidth = (width-4) / 6
               var x_ix = (i)%6
               return <rect key={i} style={{fill: ts=="todo"?'#888888a1': ts=="done"? '#38fb55':"#fb3838", fillOpacity: 1,}}
                width={dotWidth-1}
             height={dotWidth-1}
             x={x - (width/2) +2 + (x_ix*dotWidth)+0.5}
             y={y+ (y_ix * dotWidth)+0.5}
             rx="1"
             ry="1" ></rect>
             })}
             {hasDeliveries&& <DeliveryIcon ringPercent={0.6} y={y-12} x={x }></DeliveryIcon>}
             </g>)
}
const DayLabel : React.FC<DayLabelProps> = ({x, y,label})=>{

   return (<text
           xmlSpace="preserve"
           style={{fontSize: '4.85884px', lineHeight: 0.9, fontFamily: "Roboto", textAlign: 'center', writingMode: 'horizontal-tb', direction: 'ltr', textAnchor: 'middle', fill: 'url(#linearGradient187)', fillOpacity: 1, strokeWidth: 2.5355}}
           x={x}
           y={y}
           mask="none"><tspan
             id="tspan3"
             style={{fontSize: '4.85884px', fill: 'url(#linearGradient187)', fillOpacity: 1, strokeWidth: 2.5355}}
              x={x}
           y={y}>{label}</tspan></text>)
}

export default function WeekCompact() {


   const {isLoading:isloadingOverviewData,data:overviewData,error:overviewDataError} = useRoadmapOverview("thisweek");
   
   
   const [days, setDays] = useState<DayOfWeek[]|undefined>(undefined);

   const getDayIndexFromDate = (date:Date)=>{
      date = new Date(date)
           return date.getDay()
   }

   useEffect(()=>{
      if(overviewData){
         console.log("overview", overviewData)
         const grouped: Record<number, PTask[]> = overviewData.reduce((acc, task) => {
     if (!acc[getDayIndexFromDate(task.plannedStart!)]) acc[getDayIndexFromDate(task.plannedStart!)] = [];
     acc[getDayIndexFromDate(task.plannedStart!)].push(task);
     return acc;
   }, {} as Record<number, PTask[]>);
   
         var days_ = Object.entries<PTask[]>(grouped).map(([id, tasks])=>{
            var day = {hasDeliveries:tasks.some(t=>t.description&&t.description.includes("deliver")), 
               progressRatio : tasks.filter(t=>t.status=="Done").length/ tasks.length,
               tasksStatuses: tasks.map(t=>t.status=="ToDo"?"todo":t.status=="Done"?"done":"missed"),
               dayIndex : Number(id)

            } as DayOfWeek
            return day
         })
   
         console.log("days",days_)
         setDays(days_)
      }
      else{
         setDays(undefined)
      }
     
   },[overviewData])
/**
 * relative to the actual start hour of the graph (6:30 in case of start hour being 8 and div being 3)
 * @param hour 
 * @returns 
 */
const DayIndexToXCordinate=(day: number)=>{


    return  5+(day  * (RoadmapWidth/7)) + (dayWidth/2) ;
   
}
const DateToXCordinate=(date: Date)=>{

   var day = new Date(date.getTime()-(1000*60*60*SETTINGS_DAY_START_HOUR))
   day.setHours(SETTINGS_DAY_START_HOUR,0,0,0)
   var diff = (date.getTime()-day.getTime())/(1000*60*60*24)
   var day_ = day.getDay()
    return  5+(day_  * (RoadmapWidth/7)) + (dayWidth*diff) ;
   
}
const [currentTime, setCurrentTime] = useState(new Date(Date.now()))


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date(Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


const roadmapHeigh = 40
const dayWidth = RoadmapWidth/7
  return (
    <div className='font-thin w-full max-w-160 flex-shrink-0 items-end text-4xl flex flex-row gap-4'>
     
       

<svg
    style={{transition:"all 0.5s ease"}}
   width="100%"
   viewBox={`0 -10 210 ${roadmapHeigh+30}`}
   version="1.1"
   id="svg1"
   xmlnsXlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs1">
    
    
    <linearGradient
       id="linearGradient141">
      <stop
         style={{stopColor: '#ffffff', stopOpacity: 1}}
         offset="0"
         id="stop139" />
      <stop
         style={{stopColor: '#ffffff', stopOpacity: 0.98823529}}
         offset="0.69291335"
         id="stop140" />
      <stop
         style={{stopColor: '#2f2f2f', stopOpacity: 1}}
         offset="1"
         id="stop141" />
    </linearGradient>
    <linearGradient
       id="swatch17"
       gradientTransform="matrix(0.26458333,0,0,0.26458333,163.60014,401.33129)">
      <stop
         style={{stopColor: '#959fbc', stopOpacity: 1}}
         offset="0"
         id="stop17" />
    </linearGradient>
    <linearGradient
       id="swatch16"
       gradientTransform="translate(1621.481,3551.8713)">
      <stop
         style={{stopColor: '#5f729a', stopOpacity: 1}}
         offset="0"
         id="stop16" />
    </linearGradient>
    <linearGradient
       id="swatch15"
       gradientTransform="translate(618.33126,1516.8427)">
      <stop
         style={{stopColor: '#38fb55', stopOpacity: 1}}
         offset="0"
         id="stop15" />
    </linearGradient>
    <linearGradient
       id="swatch14">
      <stop
         style={{stopColor: '#b039f7', stopOpacity: 1}}
         offset="0"
         id="stop14" />
    </linearGradient>
    
   
    <linearGradient
       id="swatch10">
      <stop
         style={{stopColor: '#fa514e', stopOpacity: 1}}
         offset="0"
         id="stop11" />
    </linearGradient>
  
   
    <linearGradient
       xlinkHref="#linearGradient141"
       id="linearGradient176"
       gradientUnits="userSpaceOnUse"
       gradientTransform="matrix(1.0445496,0,0,1.6228567,-114.3554,-152.65355)"
       x1="109.4782"
       y1="180.10273"
       x2="310.5218"
       y2="180.10273" />

    <linearGradient
       xlinkHref="#swatch17"
       id="linearGradient187"
       gradientUnits="userSpaceOnUse"
       x1="-2.9290095e-07"
       y1="3.56641"
       x2="19.833937"
       y2="3.56641" />
   
    
 
  </defs>
  <g
     id="layer1">
    <g
       id="g186">
     
      <g
         id="g176"
         transform="translate(0,0)">
        <g
           id="g114"
           mask="none">
          <rect
             style={{fill: '#0B101C', fillOpacity: 1, stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeOpacity: 1}}
             id="rect99"
             width="200"
             height={roadmapHeigh}
             x="5"
             y="5"
             ry="1.5"
             rx="1.5" />
       
        

     {Array.from({ length: 7 }, (_, i) => i ).map(i=>{

         var dayData = days?.find(d=>d.dayIndex==i)
         if(!dayData) dayData = {dayIndex:i, hasDeliveries:false, progressRatio:0, tasksStatuses:[]}
         return  <DayOfWeekCell tasksStatuses={dayData.tasksStatuses} progressRatio={dayData.progressRatio} status="gray" hasDeliveries={dayData.hasDeliveries} width={dayWidth} x={DayIndexToXCordinate(i)} y={10} key={i}></DayOfWeekCell>
        })}
        
    
          
       
       
          <rect
             style={{fill: '#fb3838', fillOpacity: 0.587589, strokeOpacity: 0.680851, transition:"all 0.5s ease"}}
             id="rect114"
             width={3}
             height={roadmapHeigh-2}
             x={DateToXCordinate(currentTime)-(3/2)}
             y="6"
             ry={3/2}
             rx={3/2} />
        </g>

            {Array.from({ length: 6 }, (_, i) => i ).map(i=>{


         return  <line key={i}
             style={{stroke: '#5f729a16', fillOpacity: 1, strokeWidth: 0.5, strokeDasharray:"2 3"}}
             id="rect102"
             width="0.8"
             height={roadmapHeigh-4}
             x1={DayIndexToXCordinate(i)-(0.8/2) + dayWidth /2}
             x2={DayIndexToXCordinate(i)-(0.8/2)+ dayWidth/2 }
             y1={1+5}
             y2={1+roadmapHeigh-2+5}
             rx="0.52638358"
             ry="0.080871433" />
        })}
        
         
        {[0,1,2,3,4,5,6].map(i=>{
         
         return <DayLabel key={i} label={daysOfWeek[i]} x={DayIndexToXCordinate(i)} y={roadmapHeigh - 0}></DayLabel>
        })}
       

     
      </g>
      <rect
         style={{fill: 'none', stroke: 'none', strokeWidth: 0.529167, strokeDasharray: 'none', strokeOpacity: 1}}
         id="rect7-7-2"
         width="200"
         height={roadmapHeigh}
         x="5"
         y="5" />
    </g>
  </g>
</svg>
    </div>
   
  );
}
