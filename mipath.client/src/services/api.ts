import type { AccountInfo } from "../Model/AccountInfo";
import type { Client } from "../Model/Client";
import type { CreateProjectCommand, CreateTaskCommand, GetThisWeekOverviewQuery, GetTodayOverviewQuery, MarkTaskAsCommand, UpdateProjectEstimateValueCommand, UpdateProjectInfoCommand, UpdateTaskDueDateCommand, UpdateTaskEstimateMinuteCommand, UpdateTaskInfoCommand, UpdateTaskPlannedStartCommand } from "../Model/Commands";
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

export async function apiGetOverviewThisWeek(query: GetThisWeekOverviewQuery): Promise<PTask[]> {
    const token = localStorage.getItem("jwt");
        var params = new URLSearchParams({weekStart:query.weekStart.toISOString(), weekEnd: query.weekEnd.toISOString()})
    var res= await fetch(`/api/tasks/overview/thisweek?${params}`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        }
    });
    if(!res.ok) throw new Error(`Error adding task: ${res.statusText}`);
    return await res.json();
}
export async function apiGetOverviewToday(query: GetTodayOverviewQuery): Promise<PTask[]> {
    const token = localStorage.getItem("jwt");
    var params = new URLSearchParams({dayStart:query.dayStart.toISOString(), dayEnd: query.dayEnd.toISOString()})
    var res= await fetch(`/api/tasks/overview/today?${params}`, {
        method: 'GET',
        headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
        },
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
    await delay(100)
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

export async function apiGetAccountInfo():Promise<AccountInfo>{
    const token = localStorage.getItem("jwt"); 
    if(!token) return {isGuest:true};
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

export async function apiUpdateProjectInfo(data:UpdateProjectInfoCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/projects/${data.id}/updateinfo`, {
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


export async function apiUpdateProjectEstimateValue(data:UpdateProjectEstimateValueCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/projects/${data.id}/update-estimate`, {
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


export async function apiUpdateTaskEstimateMinute(data:UpdateTaskEstimateMinuteCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/${data.id}/update-estimate-minute`, {
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

export async function apiUpdateTaskPlannedStart(data:UpdateTaskPlannedStartCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/${data.id}/update-planned-start`, {
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

export async function apiUpdateTaskDueDate(data:UpdateTaskDueDateCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/${data.id}/update-due-date`, {
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
export async function apiUpdateTaskInfo(data:UpdateTaskInfoCommand): Promise<void> {
    const token = localStorage.getItem("jwt");
    var res= await fetch(`/api/tasks/${data.id}/update-info`, {
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
