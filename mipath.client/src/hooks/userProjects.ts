


import {useQuery} from "@tanstack/react-query"
import { delay } from "../services/utils";
import type { Project } from "../Model/Project";
import { apiFetchProjects } from "../services/api";

export function userProjects(options?:any){

    return useQuery<Project[]>({queryKey:["projects"], queryFn:async ()=>{

           return await apiFetchProjects();
    }, enabled:options?.enabled!==false})
}