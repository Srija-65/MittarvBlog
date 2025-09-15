import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700">
      <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl p-12 flex flex-col items-center w-full max-w-md border border-green-200 dark:border-green-800">
        
        {/* Title */}
        <div className="font-[Montserrat] text-5xl font-extrabold text-green-700 dark:text-green-400 mb-3 drop-shadow-lg tracking-wide">
          MittarvBlog
        </div>
        
        {/* Subtitle */}
        <div className="font-[Poppins] text-lg text-gray-700 dark:text-gray-300 mb-8 text-center italic">
         "Discover new ideas, write with passion, share your voice, and inspire the world."
        </div>

        {/* Google Login */}
        <button
          onClick={handleLogin}
          className="px-4 py-1.5 bg-gradient-to-r from-teal-400 to-emerald-500 text-white text-sm font-medium rounded-md shadow-md hover:from-teal-500 hover:to-emerald-600 transition disabled:opacity-50 flex items-center justify-center gap-2 w-full"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
