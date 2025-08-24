


import {useQuery} from "@tanstack/react-query"


export interface UsePTasksFilter {
    useCase:"today"|"week"
}

export function usePTasks(filter:UsePTasksFilter){

    return useQuery({queryKey:["pTasks",filter.useCase], queryFn:async ()=>{

            const res = await fetch(`/api/tasks?usecase=${filter.useCase}`)
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
    }})
}