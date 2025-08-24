import { useEffect, useState, type FC } from "react";
import ProjectsList from "./ProjectsList";
import type { CreateProjectCommand, Project, PTask } from "../Model/Project";
import KanbanBoard from "../Components/KanbanBoard";
const dummyTasks: PTask[] = [
  {
    id: 1,
    title: "Set up database",
    description: "Initialize PostgreSQL and create tables",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress" },
    estimateMinute: 120,
  },
  {
    id: 2,
    title: "Implement login",
    description: "Add authentication with JWT",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress" },
    estimateMinute: 60,
  },
  {
    id: 3,
    title: "Design Kanban UI",
    description: "Create mockups for the board",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress" },
    estimateMinute: 45,
  },
  {
    id: 4,
    title: "Write unit tests",
    description: "Add tests for task service",
    projectId: 101,
    project: { id: 101, name: "Freelancer Project", description:"", status:"InProgress" },
    estimateMinute: undefined, // optional
  },
];

const TodayOverview : FC = ()=>{
 
    
    return (<div className="flex flex-col items-center justify-center flex-1 overflow-auto">
       <KanbanBoard tasks={dummyTasks}></KanbanBoard>
    </div>)

   
}

export default TodayOverview