import React from 'react';
import EditProfile from '../../components/profile/EditProfile';
import { useGetLoggedInUserQuery } from '../../features/auth/authSlice';

const ProfilePage = () => {
  const { data: user, isLoading, error } = useGetLoggedInUserQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading profile</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* User Info Display */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Current Profile</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{user?.phone || 'Not set'}</p>
                </div>
                {user?.avatar && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Avatar</p>
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Edit Profile Form */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <EditProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;