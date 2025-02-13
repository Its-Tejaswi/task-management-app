import React from "react";

const NoContent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No tasks"
        className="w-40 h-40 mb-6 opacity-75"
      />
      <h2 className="text-xl font-semibold text-gray-700">
        No Tasks Available
      </h2>
      <p className="text-gray-500 mt-2">
        You have no tasks at the moment. Start by adding a new task!
      </p>
    </div>
  );
};

export default NoContent;
