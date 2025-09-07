


import {useQuery} from "@tanstack/react-query"
import type { GetTasksQuery } from "../Model/Commands";
import type { PTask } from "../Model/PTask";
import { apiGetOverviewThisWeek, apiGetOverviewToday } from "../services/api";
import { getDayStart } from "../services/utils";



export function useRoadmapOverview(useCase: "today"|"thisweek", options?:any){

    return useQuery<PTask[]>({queryKey:[useCase], queryFn:async ()=>{
        var now = new Date(Date.now())
        var SETTINGS_DAY_START_HOUR = 8
       var dayStart = getDayStart(SETTINGS_DAY_START_HOUR, now)

            if(useCase=="thisweek"){
                var offsetFromLastSunday = dayStart.getDay();

                
               
                var weekStart = new Date(dayStart.getTime()-(offsetFromLastSunday*24*60*60*1000))
                var weekEnd = new Date(weekStart.getTime()+(7*24*60*60*1000))
                return  await apiGetOverviewThisWeek({weekStart:weekStart, weekEnd: weekEnd});
            }
            else if (useCase=="today"){
                var dayEnd = new Date(dayStart.getTime()+(24*60*60*1000))
                return  await apiGetOverviewToday({dayStart:dayStart, dayEnd:dayEnd})
            }
            
           
            return [];
    }})
}