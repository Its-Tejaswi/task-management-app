import React from "react";
import RenderBoardCard from "../RenderBoardCard.tsx";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Task } from "../RenderFilterCard.tsx";

const ToDoBoard = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-400 w-full md:w-1/3 h-full p-4 rounded-lg shadow-md"
    >
      {" "}
      <div className="bg-gray-400  w-full p-6 rounded-lg shadow-inner">
        {" "}
        <h3 className="bg-[#FAC3FF] w-[20%] text-lg font-semibold rounded-md text-black mb-4 text-start pl-5">
          TO-DO
        </h3>
        <SortableContext items={tasks.map((task) => String(task.id))}>
          <div className="space-y-3">
            {tasks?.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task: Task) => (
                  <RenderBoardCard task={task} key={task.id} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center p-4">
                No tasks available
              </p>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default ToDoBoard;
