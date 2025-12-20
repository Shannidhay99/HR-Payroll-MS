import { useMemo } from 'react';

export const useCurrentUser = () => {
  return useMemo(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Debug logging
    console.log("Current user data from localStorage:", user);
    console.log("User image from DB:", user.image);

    // Get profile picture from database or use default
    const getProfilePicture = (user) => {
      // Prefer image_url from backend (full URL with asset())
      if (user.image_url) {
        return user.image_url;
      }

      // If user has an image path in the database, construct full URL
      if (user.image) {
        // If it's already a full URL, use it
        if (user.image.startsWith('http')) {
          return user.image;
        }
        // Otherwise, construct the URL from the backend
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';
        return `${backendUrl}/${user.image}`;
      }

      // Fallback to default image
      return '/images/profile-photo.jpg';
    };

    return {
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Employee',
      email: user.email || 'employee@company.com',
      phone: user.phone || 'Not Available',
      empId: user.employee_id || `EMP-${user.id || '000'}`,
      employeeId: user.employee_id || `EMP-${user.id || '000'}`,
      department: user.department || 'Not Assigned',
      designation: user.designation || 'Employee',
      joinDate: user.joining_date || (user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not Available'),
      dateOfBirth: user.date_of_birth || '',
      bloodGroup: user.blood_group || '',
      emergencyContact: user.emergency_contact_phone || '',
      address: user.address || '',
      profilePicture: getProfilePicture(user),
      roleId: user.role_id,
      isAdmin: user.role_id === 2,
      isEmployee: user.role_id === 1,
      raw: user
    };
  }, []);
};
