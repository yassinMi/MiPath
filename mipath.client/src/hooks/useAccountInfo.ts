


import {useQuery} from "@tanstack/react-query"
import type { GetTasksQuery } from "../Model/Commands";
import { apiGetAccountInfo } from "../services/api";
import type { AccountInfo } from "../Model/AccountInfo";



export function useAccountInfo(options?:any){

    return useQuery<AccountInfo|undefined>({queryKey:["accountInfo"], queryFn:async ()=>{

           return await apiGetAccountInfo()
    }})
}