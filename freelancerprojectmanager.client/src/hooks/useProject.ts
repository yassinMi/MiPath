


import {useQuery} from "@tanstack/react-query"
import { delay } from "../services/utils";
import { apiFetchProject } from "../services/api";
import type { Project } from "../Model/Project";

export function useProject(projectId?:number|string, options?:any){

    return useQuery<Project>({queryKey:["project", projectId], queryFn:async ()=>{

           return await apiFetchProject(Number(projectId))
    }, enabled:!!projectId&&projectId!==-1&&options?.enabled!==false,staleTime:options?.staleTime??1000})
}