import type { AccountInfo } from "../Model/AccountInfo";
import type { Client } from "../Model/Client";
import type { CreateProjectCommand, CreateTaskCommand, MarkTaskAsCommand } from "../Model/Commands";
import type { ProjectProgress } from "../Model/ProjectProgress";
import type { PTask } from "../Model/PTask";
import { delay } from "./utils";

export async function apiCreateProject(command: CreateProjectCommand): Promise<number> {
    const token = localStorage.getItem("jwt");
    var res= await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(command)
    });
    if(!res.ok) throw new Error(`Error creating project: ${res.statusText}`);
    var data = Number.parseInt(await res.text());
    return data;
}

export async function apiFetchProject(projectId: number): Promise<any> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/projects/${projectId}`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching project: ${res.statusText}`);
    var data = await res.json();
    return data;
}

export async function apiFetchProjects(): Promise<any[]> {
    const token = localStorage.getItem("jwt"); 
    const res = await fetch("/api/projects",{
        method: "GET",
        headers:{
            "Authorization": token ? `Bearer ${token}` : "",
        }
     });
            await delay(100);
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
            

}

export async function apiAddTaske(data:CreateTaskCommand): Promise<number> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/projects/${data.projectID}/addtask`, {
        method: 'POST',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    var taskId = Number.parseInt(await res.text());
    return taskId;
}

export async function apiGetOverviewThisWeek(): Promise<PTask[]> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/overview/thisweek`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    return await res.json();
}
export async function apiGetOverviewToday(): Promise<PTask[]> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/overview/today`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    return await res.json();
}

export async function apiFetchTask(taskId:number): Promise<PTask> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/${taskId}`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching task: ${res.statusText}`);
    return await res.json();
}
export async function apiGetClients(): Promise<Client[]> {
    const token = localStorage.getItem("jwt");
    await delay(1000);
    var res= await fetch(`/api/clients`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching clients: ${res.statusText}`);
    return await res.json();
}

export async function apiDeleteProject(projectId:number): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error deleting project: ${res.statusText}`);
    return;
}

export async function apiMarkTaskAs(data:MarkTaskAsCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/${data.id}/markas`, {
        method: 'POST',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        },
       body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error(`Error posting command: ${res.statusText}`);
    return;
}

export async function apiGetProjectProgress(projectId: number):Promise<ProjectProgress>{
    const token = localStorage.getItem("jwt"); 
    var res= await fetch(`/api/projects/${projectId}/progress`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching progress: ${res.statusText}`);
    return await res.json();
}

export async function apiGetAccountInfo():Promise<AccountInfo|undefined>{
    const token = localStorage.getItem("jwt"); 
    if(!token) return undefined;
    var res= await fetch(`/api/account/me`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching progress: ${res.statusText}`);
    return await res.json();
}