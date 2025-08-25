


import {useQuery} from "@tanstack/react-query"
import { delay } from "../services/utils";
import type { Project } from "../Model/Project";
import { apiFetchProjects } from "../services/api";

export function userProjects(){

    return useQuery<Project[]>({queryKey:["projects"], queryFn:async ()=>{

           return await apiFetchProjects();
    }})
}