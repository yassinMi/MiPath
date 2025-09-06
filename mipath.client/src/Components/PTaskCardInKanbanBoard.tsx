import type React from "react";
import type { PTask } from "../Model/PTask";
export interface PTaskCardInKanbanBoardProps{
    pTask: PTask,
    showProjectName?:boolean
}
const PTaskCardInKanbanBoard: React.FC<PTaskCardInKanbanBoardProps> = ({ pTask , showProjectName}) => {
  return (
    <div className="pTask-card border rounded  shadow p-4 mb-2 bg-white dark:bg-gray-800">
      <h3 className="font-bold text-lg">{pTask.title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{pTask.description}</p>
      {pTask.estimateMinute && (
        <p className="text-sm text-gray-500 dark:text-gray-500">Estimate: {pTask.estimateMinute} min</p>
      )}
      {pTask && showProjectName&& (
        <p className="text-sm text-gray-400 dark:text-gray-600">Project: project name here - {pTask.projectID}</p>
      )}
    </div>
  );
};

export default PTaskCardInKanbanBoard;