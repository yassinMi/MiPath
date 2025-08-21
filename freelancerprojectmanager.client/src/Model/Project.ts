import type { ProjectStatus } from "./ProjectStatus";

export interface Project {
    id: string;
    name: string;
    description: string;
    clientName?: string;
    startDate?: Date;
    endDate?: Date;
    status: ProjectStatus;
}



export interface Client {
    id: string;
    name: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    projectID: string;
    estimateMinute?: number;
}

export interface CreateProjectCommand {
    name: string;
    description?: string;
    clientID?: string;
    clientName?: string;
}

export interface UpdateProjectCommand {
    id: string;
    name: string;
    description: string;
}

export interface CreateTaskCommand {
    title: string;
    description: string;
    projectID: string;
    estimateMinute?: number;
}

export interface UpdateTaskCommand {
    id: string;
    title: string;
    description: string;
    estimateMinute?: number;
}
