


import {useQuery} from "@tanstack/react-query"
import { delay } from "../services/utils";

export function useProject(projectId?:number|string, options?:any){

    return useQuery({queryKey:["project", projectId], queryFn:async ()=>{

            const res = await fetch(`/api/projects/${projectId}`)
            await delay(1000)
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
    }, enabled:!!projectId&&projectId!==-1&&options?.enabled!==false,staleTime:options?.staleTime??1000})
}