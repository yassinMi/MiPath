import type { CreateProjectCommand, CreateTaskCommand } from "../Model/Commands";
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