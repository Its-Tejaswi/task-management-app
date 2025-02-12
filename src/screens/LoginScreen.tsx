import React from "react";
import CircleLogo from "../assets/icons/circles_bg.png";
import TaskListImg from "../assets/images/task_list_view.png";
import SignIn from "../components/SignIn.tsx";

const LoginScreen = () => {
  return (
    <div className="flex h-screen bg-[#FFF9F9] relative overflow-hidden">
      <div className="flex flex-col justify-center pl-16 md:pl-24 lg:pl-32 w-1/2">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-6">
          TaskBuddy
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>

        <SignIn />
      </div>

      {/* Right Section */}
      <div className="relative w-1/2 flex items-center justify-center">
        {/* Background Circles */}
        <img
          src={CircleLogo}
          alt="Background Circles"
          className="absolute w-[600px] md:w-[800px] opacity-50"
        />
        {/* Task List Image */}
        <img
          src={TaskListImg}
          alt="Task List"
          className="relative z-10 w-[350px] md:w-[450px] lg:w-[550px]"
        />
      </div>
    </div>
  );
};

export default LoginScreen;
