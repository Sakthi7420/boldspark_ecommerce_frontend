import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user?.userType;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        {user ? (
          <div className="flex flex-col items-center">
            <FaUser className="text-6xl rounded-md mb-4 text-gray-400"/>
            {userType === 'signup' ? (
              <>
                <p className="mb-4 text-lg font-medium">First Name: {user.firstName}</p>
                <p className="mb-4 text-lg font-medium">Last Name: {user.lastName}</p>
              </>
            ) : null}
            <p className="mb-4 text-lg font-medium">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">No user data found. Please sign up.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
