import type { Client } from "../Model/Client";
import type { CreateProjectCommand, CreateTaskCommand, MarkTaskAsCommand } from "../Model/Commands";
import type { ProjectProgress } from "../Model/ProjectProgress";
import type { PTask } from "../Model/PTask";
import { delay } from "./utils";

export async function apiCreateProject(command: CreateProjectCommand): Promise<number> {
    var res= await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(command)
    });
    if(!res.ok) throw new Error(`Error creating project: ${res.statusText}`);
    var data = Number.parseInt(await res.text());
    return data;
}

export async function apiFetchProject(projectId: number): Promise<any> {
    var res= await fetch(`/api/projects/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching project: ${res.statusText}`);
    var data = await res.json();
    return data;
}

export async function apiFetchProjects(): Promise<any[]> {
     const res = await fetch("/api/projects")
            await delay(100);
            if (!res.ok) {
                throw new Error(`failed req: ${res.status}`);
            }
            return await res.json()
            

}

export async function apiAddTaske(data:CreateTaskCommand): Promise<number> {
    var res= await fetch(`/api/projects/${data.projectID}/addtask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    var taskId = Number.parseInt(await res.text());
    return taskId;
}

export async function apiGetOverviewThisWeek(): Promise<PTask[]> {
    var res= await fetch(`/api/tasks/overview/thisweek`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    return await res.json();
}
export async function apiGetOverviewToday(): Promise<PTask[]> {
    var res= await fetch(`/api/tasks/overview/today`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    return await res.json();
}

export async function apiFetchTask(taskId:number): Promise<PTask> {
    var res= await fetch(`/api/tasks/${taskId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching task: ${res.statusText}`);
    return await res.json();
}
export async function apiGetClients(): Promise<Client[]> {
    await delay(1000);
    var res= await fetch(`/api/clients`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching clients: ${res.statusText}`);
    return await res.json();
}

export async function apiDeleteProject(projectId:number): Promise<void> {
    var res= await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error deleting project: ${res.statusText}`);
    return;
}

export async function apiMarkTaskAs(data:MarkTaskAsCommand): Promise<void> {
    var res= await fetch(`/api/tasks/${data.id}/markas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error(`Error posting command: ${res.statusText}`);
    return;
}

export async function apiGetProjectProgress(projectId: number):Promise<ProjectProgress>{
     var res= await fetch(`/api/projects/${projectId}/progress`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error fetching progress: ${res.statusText}`);
    return await res.json();
}