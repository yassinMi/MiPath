import type { PTaskStatus } from "./PTask";



export type ProjectCreationStatus  = "Scoping"|"Active"


export interface CreateProjectCommand {
  name: string;
  description?: string;
  clientID?: number;
  /**
   * if client id not provided, this creates a new client
   */
  newClientName?: string;
  status: ProjectCreationStatus;
}
//todo fix typo in backend
export type CloseAs =  "Canceld" |  "Completed"


export interface CloseProjectAsCommand {
  id: number;
  intent: CloseAs;
  forceCompleteOpenTasks: boolean;
}

export interface UpdateProjectEstimateValueCommand {
  id: number;
  estimateValue?: number;
}


export interface CreateTaskCommand {
  title: string;
  description: string;
  projectID: number;
  estimateMinute?: number;
  dueDate?: Date;
  plannedStart?: Date;
}

export type MarkAs = 
   "InProgress" |
   "Completed" |
  "ReOpen"


export interface MarkTaskAsCommand {
  id: number;
  intent: MarkAs;
}

export interface UpdateTaskInfoCommand {
  id: number;
  title: string;
  description: string;
}

export interface UpdateTaskDueDateCommand {
  id: number;
  dueDate?: Date;
}

export interface UpdateTaskPlannedStartCommand {
  id: number;
  plannedStart?: Date;
}

export interface UpdateTaskEstimateMinuteCommand {
  id: number;
  estimateMinute?: number;
}

export interface UpdateProjectInfoCommand {
  id: number;
  name: string;
  description: string;
}



export interface GetTasksQuery {
  statuses?: PTaskStatus[];
  isOverdue?: boolean;

  dueDateMin?: Date;
  dueDateMax?: Date;
  plannedStartMin?: Date;
  plannedStartMax?: Date;
  createdAtMin?: Date;
  createdAtMax?: Date;
  completedAtMin?: Date;
  completedAtMax?: Date;

  projectID?: number;
  isDescending?: boolean;
  orderByProperty?: string;
}
