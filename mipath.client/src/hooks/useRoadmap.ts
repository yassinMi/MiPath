


import {useQuery} from "@tanstack/react-query"
import type { GetTasksQuery } from "../Model/Commands";
import type { PTask } from "../Model/PTask";
import { apiGetOverviewThisWeek, apiGetOverviewToday } from "../services/api";



export function useRoadmapOverview(useCase: "today"|"thisweek", options?:any){

    return useQuery<PTask[]>({queryKey:[useCase], queryFn:async ()=>{

            const res = useCase=="thisweek"?  await apiGetOverviewThisWeek():
            useCase=="today"? await apiGetOverviewToday():[];
           
            return  res;
    }})
}