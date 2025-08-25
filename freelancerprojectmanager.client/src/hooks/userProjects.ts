


import {useQuery} from "@tanstack/react-query"
import { delay } from "../services/utils";
import type { Project } from "../Model/Project";

export function userProjects(){

    return useQuery<Project[]>({queryKey:["projects"], queryFn:async ()=>{

            const res = await fetch("/api/projects")
            await delay(5000);
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
    }})
}