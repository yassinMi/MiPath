import { useQuery } from "@tanstack/react-query";
import { apiGetClients } from "../services/api";
import type { Client } from "../Model/Client";

export function useClients(){
    
    return useQuery<Client[]>({queryKey:["clients"], queryFn:async ()=>{

           return await apiGetClients();
    }})
   
    
}