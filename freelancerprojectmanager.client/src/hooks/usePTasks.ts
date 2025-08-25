


import {useQuery} from "@tanstack/react-query"
import type { GetTasksQuery } from "../Model/Commands";
import type { PTask } from "../Model/PTask";



export function usePTasks(query: GetTasksQuery, options?:any){

    return useQuery<PTask[]>({queryKey:["pTasks",query], queryFn:async ()=>{

            const res = await fetch(`/api/tasks?`+new URLSearchParams(query as any).toString())
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
    }})
}