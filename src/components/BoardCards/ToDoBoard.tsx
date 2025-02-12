import React from "react";
import RenderBoardCard from "../RenderBoardCard.tsx";

import { useDroppable } from "@dnd-kit/core";
import { Card, CardContent, Typography } from "@mui/material";
import { SortableContext } from "@dnd-kit/sortable";

const ToDoBoard = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-400 w-full md:w-1/3 h-full p-4 rounded-lg shadow-md"
    >
      {" "}
      {/* Added background and width */}
      <div className="bg-gray-400  w-full p-6 rounded-lg shadow-inner">
        {" "}
        {/* Added inner shadow */}
        <h3 className="bg-[#FAC3FF] w-[20%] text-lg font-semibold rounded-md text-black mb-4 text-start pl-5">
          TO-DO
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
              <Card className="shadow-md border-l-4 border-blue-500 mb-3 p-4">
                <CardContent>
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-500"
                  >
                    No Tasks To Display
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default ToDoBoard;
