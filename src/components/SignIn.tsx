import React from "react";

import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "../assets/icons/google.png";
import { auth, provider } from "../lib/config/firebaseConfig.ts";
const SignIn = () => {
  const handleSignInClick = async () => {
    try {
      // Store user Details and navigate to next page
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw new Error(err.message);
      }
    }
  };
  return (
    <button
      className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition"
      onClick={handleSignInClick}
    >
      <img src={GoogleIcon} alt="Google Logo" className="w-8 h-8" />
      <span className="font-medium text-lg">Continue with Google</span>
    </button>
  );
};

export default SignIn;
