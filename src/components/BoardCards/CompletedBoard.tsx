import React from "react";
import RenderBoardCard from "../RenderBoardCard.tsx";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const CompletedBoard = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="bg-gray-400 w-full md:w-1/3 h-full p-4 rounded-lg shadow-md"
    >
      {" "}
      {/* Added background and width */}
      <div className="bg-gray-400 w-full p-6 rounded-lg shadow-inner">
        {" "}
        {/* Added inner shadow */}
        <h3 className="bg-[#A2D6A0] w-[30%] text-lg font-semibold rounded-md text-black mb-4 text-start pl-5">
          COMPLETED
        </h3>
        <SortableContext items={tasks.map((task) => String(task.id))}>
          <div className="space-y-3">
            {tasks?.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => (
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

export default CompletedBoard;
