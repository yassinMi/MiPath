


import {useQuery} from "@tanstack/react-query"

export function useProjectPTasks(projectId:number|string|undefined,options?:any){

    return useQuery({queryKey:["projectPTasks",projectId], queryFn:async ()=>{

            const res = await fetch(`/api/projects/${projectId}/tasks`)
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
    },enabled:!!projectId})
}