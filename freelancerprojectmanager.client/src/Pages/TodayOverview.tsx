import { useEffect, useState, type FC } from "react";
import ProjectsList from "../Components/ProjectsList";
import type { CreateProjectCommand, Project, PTask } from "../Model/Project";
import KanbanBoard from "../Components/KanbanBoard";
import { usePTasks } from "../hooks";
import { CircularProgress } from "@mui/material";
const dummyTasks: PTask[] = [
  {
    id: 1,
    title: "Set up database",
    description: "Initialize PostgreSQL and create tables",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress",taskCount:0 },
    estimateMinute: 120,
  },
  {
    id: 2,
    title: "Implement login",
    description: "Add authentication with JWT",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress",taskCount:0 },
    estimateMinute: 60,
  },
  {
    id: 3,
    title: "Design Kanban UI",
    description: "Create mockups for the board",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress",taskCount:0 },
    estimateMinute: 45,
  },
  {
    id: 4,
    title: "Write unit tests",
    description: "Add tests for task service",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress",taskCount:0 },
    estimateMinute: undefined, // optional
  },
];

const TodayOverview : FC = ()=>{
 
    const {data:pTasks, isLoading:isLoadingPTasks, error:errorPTasks} = usePTasks({useCase:"today"})
    return (<div className="flex flex-col items-center justify-center flex-1 overflow-auto">
        {isLoadingPTasks?<CircularProgress></CircularProgress>:null}
        {errorPTasks?<>failed load tasks: {(errorPTasks as Error).message}</>:null}
        {pTasks?.length===0?<>No tasks for today</>:null}
        {pTasks?.length?
       <KanbanBoard tasks={pTasks}></KanbanBoard>   :null
        }
    </div>)

   
}

export default TodayOverview