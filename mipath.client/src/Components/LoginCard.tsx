

import React from 'react';
export interface LoginCardProps {
    onGoogleLogin?: () => void;
}
const LoginCard: React.FC<LoginCardProps> = ({  onGoogleLogin}) => { 

    return  <div className="flex justify-center items-center h-full">
      <button
        onClick={onGoogleLogin}
        className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 font-medium"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-5 h-5 mr-3"
        />
        Login with Google
      </button>
    </div>
}

export default LoginCard