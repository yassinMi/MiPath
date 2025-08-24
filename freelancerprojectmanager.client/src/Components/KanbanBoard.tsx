import React, { useState } from "react";
import type { PTask } from "../Model/Project";
import PTaskCardInKanbanBoard from "./PTaskCardInKanbanBoard";

interface KanbanBoardProps {
  tasks: PTask[];
}

type Column = "todo" | "inProgress" | "done";

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const [columns, setColumns] = useState<Record<Column, PTask[]>>({
    todo: tasks.filter((t) => t.projectId && !t.estimateMinute),
    inProgress: tasks.filter((t) => t.estimateMinute && t.estimateMinute <= 60),
    done: tasks.filter((t) => t.estimateMinute && t.estimateMinute > 60),
  });

  return (
    <div className="flex gap-4 p-4">
      {(["todo", "inProgress", "done"] as Column[]).map((col) => (
        <div key={col} className="flex-1 bg-gray-100 dark:bg-gray-950 p-2 rounded">
          <h2 className="font-bold mb-2 capitalize">{col}</h2>
          {columns[col].map((task) => (
            <PTaskCardInKanbanBoard key={task.id} pTask={task} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
