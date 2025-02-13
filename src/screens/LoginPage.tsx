import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig.ts";
import CircleLogo from "../assets/icons/circles_bg.png";
import GoogleIcon from "../assets/icons/google.png";

const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/task-view");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F9F6F5] items-center justify-center"> {/* Added items-center justify-center to the main div */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-6 md:px-24 py-12 md:py-0"> {/* Added items-center justify-center and py for vertical centering on mobile */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#6D28D9] flex items-center gap-3 mb-4 md:mb-0"> {/* Added mb for spacing */}
          <span className="text-4xl md:text-5xl">📋</span> TaskBuddy
        </h1>
        <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </p>

        <button
          onClick={handleSignIn}
          className="mt-6 flex items-center justify-center gap-3 px-5 md:px-6 py-3 bg-black text-white text-base md:text-lg font-medium rounded-lg md:rounded-xl shadow-lg hover:shadow-xl hover:bg-opacity-90 transition-all duration-300"
        >
          <img
            src={GoogleIcon}
            alt="Google Icon"
            className="w-5 md:w-6 h-5 md:h-6"
          />
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center relative mt-10 md:mt-0 hidden md:flex"> {/* Added hidden md:flex to hide on smaller screens, and removed unnecessary margins */}
        <img
          src={CircleLogo}
          alt="Background Circle"
          className="absolute w-[90%] md:w-[100%] h-auto left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-40"
        />
        <img
          src="https://s3-alpha-sig.figma.com/img/494f/1405/d39d91697e2b4152019135fa206392a5?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iNplzJC6HqBINmphLBWH4spW8G3-~bqS81YUiNP9-ZJn58WGViZqpqY1q1olJPnG0zJzctH0qeZ~HAPyFD23ZjUqJH46jhteT3lLvPQLuzPFv1MuYSFBDN9ougpUMTVvQhh8c3FRgxc79VQ~r4YJtraHVEN4zL44kDPP9DFDdSRMTG65DOBtPwH8tST3caiCaNjkcOx5-EQmfIRZWx9aLtDRYRbCaDDJe5UPr8EwA5Jyzl8HQFAG4-9-apyLac~LGqBrVRCA~goDp6SXqi7TfEEih9eYlKg8bjZ0cFJ85MXg3AA4yRlHVGKUAVKOu-3tqhXbckdYOMABk9CBWpiBJw__"
          alt="Task Manager UI"
          className="relative w-[80%] md:w-[70%] h-auto rounded-xl shadow-lg translate-x-0 md:translate-x-10"
        />
      </div>
    </div>
  );
};

export default LoginPage;