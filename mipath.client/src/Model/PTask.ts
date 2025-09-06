

/**
 * corresponds to the dto returned by most apis
 */
export interface PTask {
   id: number;
  title: string;
  description: string;

  projectID: number;
  estimateMinute?: number;
  dueDate?: Date;
  plannedStart?: Date;
  status: PTaskStatus;
  createdAt: Date;
  completedAt?: Date;
}


export type PTaskStatus =
  | "ToDo"
  | "InProgress"
  | "Done"
  | "Canceled";
