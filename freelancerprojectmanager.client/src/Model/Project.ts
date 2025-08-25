import type { ProjectStatus } from "./ProjectStatus";
import type { PTask } from "./PTask";

export interface Project {
    estimateValue?: number;
    taskCount: number;
    id: number;
    name: string;
    description: string;
    client?: Client;
    startDate?: Date;
    endDate?: Date;
    status: ProjectStatus;
    loggedMinutes?: number;
    /**
     * available when fetching a single project, not available when fetching all projects
     */
    tasks?:PTask[];
}



export interface Client {
    id: string;
    name: string;
}

