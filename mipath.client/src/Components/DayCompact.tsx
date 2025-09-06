import React, { useEffect, useState } from "react";
import { useRoadmapOverview } from "../hooks/useRoadmap";
import type { PTask } from "../Model/PTask";
import { apiMarkTaskAs } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "./SnackbarContext";

interface HourLabelProps {
   x:number,
   y:number,
   label: string
}
interface TaskCircleProps {
   x:number,
   y:number,
   status : "green"|"gray",
   width:number,
   task: PTask
}

interface TrackTask {
   task: PTask;
   startTime : Date,
   status : "green"|"gray",
   saskId: number
}
interface Track {
   tasks: TrackTask[],
   projectId: number
}
/**
 * a date represeting 8 am today
 */
const DayStartDate = new Date(Date.now())
DayStartDate.setHours(8,0,0,0)
const RoadmapWidth = 200
const tracksGap = 5;
const trackHeight = 10;
const roadmapVerticalPadding = 5
const ticksHeight = 5;
const timeDiv = 3; //3 hours per segment
const Tracks_:Track[] = [
   /*{projectId:1, tasks:[
      {startTime:new Date("2025-09-06T08:00:00"), status:"green",saskId:1},
      {startTime:new Date("2025-09-06T13:00:00"), status:"green",saskId:2},
      {startTime:new Date("2025-09-06T17:00:00"), status:"gray",saskId:3},
   ]},
   {projectId:2, tasks:[
      {startTime:new Date("2025-09-06T08:00:00"), status:"green",saskId:4},
      {startTime:new Date("2025-09-06T16:00:00"), status:"gray",saskId:5},
      {startTime:new Date("2025-09-06T19:00:00"), status:"gray",saskId:6},
   ]},
    {projectId:3, tasks:[
      {startTime:new Date("2025-09-06T08:00:00"), status:"green",saskId:7},
      {startTime:new Date("2025-09-06T16:00:00"), status:"gray",saskId:8},
      {startTime:new Date("2025-09-06T19:00:00"), status:"gray",saskId:9},
   ]},
    {projectId:4, tasks:[
      {startTime:new Date("2025-09-06T08:00:00"), status:"green",saskId:10},
   ]},*/
]
const TaskCircle : React.FC<TaskCircleProps> = ({x, y, status,width, task})=>{

const {showSnackbar} = useSnackbar()
const queryClient = useQueryClient();
    const markAsMutation = useMutation({mutationFn:async()=>{
          await apiMarkTaskAs({id:task.id, intent: status=="gray"?"Completed":"ReOpen"})
         showSnackbar("updated task status", "success")

    }, onSuccess:()=>{
         queryClient.invalidateQueries({queryKey:["today"]})
         queryClient.invalidateQueries({queryKey:["project"]})
    }})
    const handleSatusToggle = async()=>{

       
        markAsMutation.mutate()

    }
    const raduis = ((RoadmapWidth/24)/2)-0.5
   return (<><circle onClick={()=>{handleSatusToggle()}}
             style={{cursor:"pointer", fill: status=="gray"?'url(#swatch16)': 'url(#swatch15)', transition:"all 0.5s ease", fillOpacity: 1, strokeWidth: 2.19533}}
             opacity={markAsMutation.isPending?0.5:1}
             cx={x}
             cy={y}
             r={raduis} /><rect
             style={{fill: status=="gray"?'url(#swatch16)': 'url(#swatch15)', fillOpacity: 1, strokeWidth: 3.32833, transition:"all 0.5s ease"}}
             
             width={width}
             height={raduis*2}
             x={x+raduis+0.5}
             y={y-raduis}
             rx="1"
             ry="1" />
            
             </>)
}
const HourLabel : React.FC<HourLabelProps> = ({x, y,label})=>{

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

export default function DayCompact() {
/**
 * relative to the actual start hour of the graph (6:30 in case of start hour being 8 and div being 3)
 * @param hour 
 * @returns 
 */
const HourToXCordinate=(hour: Date)=>{
    var hoursDiffFromDayStart = ( hour.getTime() - DayStartDate.getTime() )/ (1000 * 60 * 60)
  if(hoursDiffFromDayStart<-1) hoursDiffFromDayStart = hoursDiffFromDayStart + 24
    return  ( (hoursDiffFromDayStart + (timeDiv/2)) * (RoadmapWidth/24));
   
}

const {isLoading:isloadingOverviewData,data:overviewData,error:overviewDataError} = useRoadmapOverview("today");


const [tracks, setTracks] = useState<Track[]|undefined>(undefined);

const isWithinDay = (d:Date)=>{
   var diffHours = ( d.getTime()- DayStartDate .getTime())/(1000*60*60)
   return diffHours >0 && diffHours <24
}
useEffect(()=>{
   if(overviewData){
      console.log("overview", overviewData)
      const grouped: Record<number, PTask[]> = overviewData.reduce((acc, task) => {
  if (!acc[task.projectID]) acc[task.projectID] = [];
  acc[task.projectID].push(task);
  return acc;
}, {} as Record<number, PTask[]>);

      var tracks_ = Object.entries<PTask[]>(grouped).map(([id, tasks])=>{
         var track = {projectId:Number(id),tasks:tasks.filter(t=>t.plannedStart&&isWithinDay(new Date(t.plannedStart))). map(t=>({saskId:t.id,startTime:new Date(t.plannedStart!),status:t.status=="ToDo"? "gray": t.status=="Done"?"green":"gray", task:t} as TrackTask ))} as Track
         track.tasks.sort((a, b) => new Date(a.startTime!).getTime() - new Date(b.startTime!).getTime());
         return track
      }).filter(tr=>tr.tasks.length)

      console.log("tracks",tracks_)
      setTracks(tracks_)
   }
   else{
      setTracks(undefined)
   }
  
},[overviewData])
const [currentTime, setCurrentTime] = useState(new Date(Date.now()))


  useEffect(() => {
    const interval = setInterval(() => {
      //setCurrentTime(new Date(DayStartDate.getTime()+(1000*60*60*(new Date(Date.now()).getSeconds()%12))));
      setCurrentTime(new Date(Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
if(!tracks) return null

const roadmapHeigh = (roadmapVerticalPadding*2) + (tracksGap* (Math.max(0,tracks.length-1))) + (trackHeight*tracks.length)  +ticksHeight
  return (
    <div className='font-thin w-full max-w-160 flex-shrink-0 items-end text-4xl flex flex-row gap-4'>
     
       

<svg
    style={{transition:"all 0.5s ease"}}
   width="100%"
   viewBox={`0 0 210 ${roadmapHeigh+30}`}
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
  
    
    <mask
       maskUnits="userSpaceOnUse"
       id="mask176">
      <rect
         style={{fill: 'url(#linearGradient176)', stroke: 'none', strokeWidth: 1.03122, strokeDasharray: 'none', strokeOpacity: 1}}
         id="rect176"
         width="210"
         height={roadmapHeigh+100}
         x="0"
         y="0"
         ry="0"
         rx="0"
         mask="none" />
    </mask>
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
      <rect
         style={{fill: '#040812', fillOpacity: 1, strokeWidth: 3.46319}}
         id="rect1"
         width="200"
         height={roadmapHeigh}
         x="5"
         y="5"
         rx="0"
         ry="0" />
      <g
         id="g176"
         mask="url(#mask176)"
         transform="translate(0,0)">
        <g
           id="g114"
           mask="none">
          <rect
             style={{fill: '#0B101C', fillOpacity: 1, stroke: 'none', strokeWidth: 0.792038, strokeDasharray: 'none', strokeOpacity: 1}}
             id="rect99"
             width="200"
             height={roadmapHeigh}
             x="5"
             y="5"
             ry="1.5"
             rx="1.5" />
       
        

    
    
          
          {tracks.map((t,ix)=>{
           const hourWidth = 200.0/24
           var yOffset = roadmapVerticalPadding + (ix*trackHeight) + (Math.max(0,ix)*tracksGap) +5 + (trackHeight/2)
           var tasksWithLengths = t.tasks.map((ts,tix)=>{
            var nextTask = t.tasks.length<tix+2? undefined: t.tasks[tix+1]
            var endHour = new Date(DayStartDate)
            if(nextTask) {endHour = nextTask.startTime


            }
            else endHour.setTime(endHour.getTime()+ 23 * 60 * 60 * 1000)
            var diffHours =( (endHour.getTime()- ts.startTime.getTime()  )/ (1000 * 60 * 60)) -1
            return ({x:HourToXCordinate(ts.startTime), y:yOffset, task:ts , width: diffHours*hourWidth})
         });
           return <>{tasksWithLengths.map(tw=>{

            return <TaskCircle task={tw.task.task} key={tw.task.saskId} x={tw.x} y={tw.y} width={tw.width} status={tw.task.status}></TaskCircle>
           })}</>
          })}
         {/* <image height={20} width={20} x={15} y={roadmapHeigh/2-(5)}  href="/bot1.png" />  */}
       
          <rect
             style={{fill: '#fb3838', fillOpacity: 0.587589, strokeOpacity: 0.680851, transition:"all 0.5s ease"}}
             id="rect114"
             width="3"
             height={roadmapHeigh-2}
             x={HourToXCordinate(currentTime)-1.5}
             y="6"
             ry="1.5"
             rx="1.5" />
        </g>

            {Array.from({ length: 8 }, (_, i) => i+1 ).map(i=>{

         let hourIndex =  -3+(i*3);
         let hourDate = new Date(DayStartDate.getTime() + (hourIndex * 1000*60*60))

         return  <rect key={i}
             style={{fill: '#ffffff', fillOpacity: 1, strokeWidth: 1.6352}}
             id="rect102"
             width="0.8"
             height={ticksHeight-4}
             x={HourToXCordinate(hourDate)-(0.8/2)}
             y={roadmapHeigh+5 - ticksHeight+2}
             rx="0.52638358"
             ry="0.080871433" />
        })}
        
         
        {[1,2,3,4,5,6,7,8].map(i=>{
         let hourIndex =  -3+(i*3);
         let hourDate = new Date(DayStartDate.getTime() + (hourIndex * 1000*60*60))
         const timeStr = hourDate.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
});
         return <HourLabel key={i} label={timeStr} x={HourToXCordinate(hourDate)} y={roadmapHeigh + 12}></HourLabel>
        })}
       

     
      </g>

      <rect
         style={{fill: 'none', stroke: '#111928', strokeWidth: 0.529167, strokeDasharray: 'none', strokeOpacity: 1}}
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
