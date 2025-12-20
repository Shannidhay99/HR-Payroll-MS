// hooks/useCurrentAdminUser.js
import { useMemo } from "react";
import { useAuth } from "./useAuth";

export function useCurrentAdminUser() {
  const { user } = useAuth();

  const getProfilePicture = (user) => {
    // Prefer image_url from backend (full URL with asset())
    if (user && user.image_url) {
      return user.image_url;
    }

    // If user has an image path in the database, construct full URL
    if (user && user.image) {
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

  return useMemo(() => {
    if (!user) {
      return {
        firstName: 'Admin',
        lastName: 'User',
        fullName: 'Admin User',
        email: 'admin@company.com',
        empId: 'ADM-000',
        department: 'Administration',
        designation: 'Administrator',
        phone: 'Not Available',
        address: 'Not Specified',
        emergencyContact: 'Not Available',
        bloodGroup: 'Not Specified',
        dateOfBirth: 'Not Specified',
        joinDate: 'Not Available',
        profilePicture: '/images/profile-photo.jpg',
      };
    }

    return {
      firstName: user.firstName || 'Admin',
      lastName: user.lastName || 'User',
      fullName: user.firstName && user.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : 'Admin User',
      email: user.email || 'admin@company.com',
      empId: `ADM-${user.id || '000'}`,
      department: user.department || 'Administration',
      designation: user.designation || 'Administrator',
      phone: user.phone || 'Not Available',
      address: user.address || 'Not Specified',
      emergencyContact: user.emergencyContact || 'Not Available',
      bloodGroup: user.bloodGroup || 'Not Specified',
      dateOfBirth: user.dateOfBirth || 'Not Specified',
      joinDate: user.created_at 
        ? new Date(user.created_at).toLocaleDateString() 
        : 'Not Available',
      profilePicture: getProfilePicture(user),
    };
  }, [user]);
}
