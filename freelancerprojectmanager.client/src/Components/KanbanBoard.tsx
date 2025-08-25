import React, { useState } from "react";
import PTaskCardInKanbanBoard from "./PTaskCardInKanbanBoard";
import type { PTask } from "../Model/PTask";

type KanbanBoardProps = {
  tasks: PTask[];
}& React.HTMLAttributes<HTMLDivElement>;


type Column = "todo" | "inProgress" | "done";

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, className }) => {
  const [columns, setColumns] = useState<Record<Column, PTask[]>>({
    todo: tasks.filter((t) => t.status === "ToDo"),
    inProgress: tasks.filter((t) => t.status === "InProgress"),
    done: tasks.filter((t) => t.status === "Done"),
  });

  return (
    <div className={`flex flex-row gap-4 p-4  flex-1 overflow-auto items-stretch w-full ${className}`}>
      {(["todo", "inProgress", "done"] as Column[]).map((col) => (
        <div key={col} className="flex-1 flex flex-col overflow-auto bg-gray-100 dark:bg-gray-950 p-2 rounded">
          <h2 className="font-bold flex-shrink-0 mb-2 capitalize">{col}</h2>
          <div className="flex-1 flex flex-col overflow-auto">
             {columns[col].map((task) => (
            <PTaskCardInKanbanBoard key={task.id} pTask={task} />
          ))}
            </div>
         
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
