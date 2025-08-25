import { useEffect, useState, type FC } from "react";
import ProjectsList from "../Components/ProjectsList";
import type {  Project } from "../Model/Project";
import KanbanBoard from "../Components/KanbanBoard";
import { usePTasks } from "../hooks";
import { CircularProgress } from "@mui/material";
import type { PTask } from "../Model/PTask";
import { useRoadmapOverview } from "../hooks/useRoadmap";

const TodayOverview : FC = ()=>{
 
    const {data:pTasks, isLoading:isLoadingPTasks, error:errorPTasks} = useRoadmapOverview("today")
    return (<div className="flex flex-col max-h-[calc(100vh-5rem)] items-center justify-center flex-1 overflow-auto">
        {isLoadingPTasks?<CircularProgress></CircularProgress>:null}
        {errorPTasks?<>failed load tasks: {(errorPTasks as Error).message}</>:null}
        {pTasks?.length===0?<>No tasks for today</>:null}
        {pTasks?.length?
       <KanbanBoard className="h-[50%]" tasks={pTasks}></KanbanBoard>   :null
        }
    </div>)

   
}

export default TodayOverview