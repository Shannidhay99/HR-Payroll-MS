import React, { useState, useMemo, useRef } from "react";
import { useCurrentUser } from "../../components/hooks/useCurrentUser";
import { useUpdateProfileMutation, useUploadProfileImageMutation, setUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function EmployeeProfile() {
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const initialEmployeeData = useMemo(() => {
    return {
      name: currentUser.fullName,
      employeeId: currentUser.empId,
      email: currentUser.email,
      phone: currentUser.phone,
      department: currentUser.department,
      designation: currentUser.designation,
      joinDate: currentUser.joinDate,
      address: currentUser.address,
      emergencyContact: currentUser.emergencyContact,
      bloodGroup: currentUser.bloodGroup,
      dateOfBirth: currentUser.dateOfBirth,
      profilePicture: currentUser.profilePicture,
    };
  }, [currentUser]);

  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadProfileImage, { isLoading: isUploading }] = useUploadProfileImageMutation();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2048 * 1024) { // 2MB limit
        alert("File size must be less than 2MB");
        return;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPG, PNG, or WEBP)");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await uploadProfileImage(formData).unwrap();

      // Update user data in localStorage and Redux
      const updatedUser = {
        ...currentUser.raw,
        image: response.image,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch(setUser(updatedUser));

      // Update local state
      setEmployeeData({
        ...employeeData,
        profilePicture: response.image,
      });

      alert("Profile photo updated successfully!");
      setSelectedFile(null);
      setPreviewUrl(null);

      // Reload to refresh all instances
      window.location.reload();
    } catch (error) {
      alert(error.data?.message || "Failed to upload photo");
      console.error("Error uploading photo:", error);
    }
  };

  const handleSave = async () => {
    try {
      const names = employeeData.name.split(" ");
      const firstName = names[0];
      const lastName = names.slice(1).join(" ");

      const response = await updateProfile({
        firstName,
        lastName,
        phone: employeeData.phone,
        department: employeeData.department,
        designation: employeeData.designation,
        emergencyContact: employeeData.emergencyContact,
        bloodGroup: employeeData.bloodGroup,
        dateOfBirth: employeeData.dateOfBirth,
        address: employeeData.address,
      }).unwrap();

      // Update user data in localStorage and Redux
      const updatedUser = {
        ...currentUser.raw,
        firstName,
        lastName,
        phone: employeeData.phone,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch(setUser(updatedUser));

      // Update the local state with the new data
      setEmployeeData({
        ...employeeData,
        name: `${firstName} ${lastName}`,
      });

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert(error.data?.message || "Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and settings</p>
        </div>
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className={`px-4 py-2 ${
                  isUpdating ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
                } text-white rounded-lg transition-colors flex items-center gap-2`}
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <img src="/icons/pencil.svg" alt="Edit" className="h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <img
                className="h-32 w-32 rounded-full object-cover mx-auto border-4 border-red-200"
                src={previewUrl || employeeData.profilePicture}
                alt={employeeData.name}
              />
              <h2 className="text-xl font-bold text-gray-900 mt-4">{employeeData.name}</h2>
              <p className="text-gray-600">{employeeData.designation}</p>
              <p className="text-sm text-gray-500 mt-1">ID: {employeeData.employeeId}</p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
              />

              {isEditing && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={handlePhotoUpload}
                    disabled={isUploading}
                    className={`w-full px-4 py-2 ${
                      isUploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2`}
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : selectedFile ? (
                      'Upload Photo'
                    ) : (
                      'Change Photo'
                    )}
                  </button>
                  {selectedFile && (
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={employeeData.name}
                    onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                <p className="text-gray-900 py-2">{employeeData.employeeId}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={employeeData.email}
                    onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={employeeData.phone}
                    onChange={(e) => setEmployeeData({...employeeData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <p className="text-gray-900 py-2">{employeeData.department}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <p className="text-gray-900 py-2">{employeeData.designation}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                <p className="text-gray-900 py-2">{employeeData.joinDate}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={employeeData.dateOfBirth}
                    onChange={(e) => setEmployeeData({...employeeData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                {isEditing ? (
                  <select
                    value={employeeData.bloodGroup}
                    onChange={(e) => setEmployeeData({...employeeData, bloodGroup: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.bloodGroup}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={employeeData.emergencyContact}
                    onChange={(e) => setEmployeeData({...employeeData, emergencyContact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.emergencyContact}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={employeeData.address}
                    onChange={(e) => setEmployeeData({...employeeData, address: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{employeeData.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
