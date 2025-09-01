
import {useQuery} from "@tanstack/react-query"
import { apiFetchProject, apiGetProjectProgress } from "../services/api";
import type { Project } from "../Model/Project";
import type { ProjectProgress } from "../Model/ProjectProgress";

export function useProjectProgress(projectId?:number|string, options?:any){

    return useQuery<ProjectProgress>({queryKey:["project", projectId], queryFn:async ()=>{

           return await apiGetProjectProgress(Number(projectId))
    }, enabled:!!projectId&&projectId!==-1&&options?.enabled!==false})
}