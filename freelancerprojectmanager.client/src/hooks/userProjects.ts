


import {useQuery} from "@tanstack/react-query"

export function userProjects(){

    return useQuery({queryKey:["projects"], queryFn:async ()=>{

            const res = await fetch("/api/project")
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
    }})
}