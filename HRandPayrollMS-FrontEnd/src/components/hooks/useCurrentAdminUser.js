// hooks/useCurrentAdminUser.js
import { useMemo } from "react";
import { useAuth } from "./useAuth";

export function useCurrentAdminUser() {
  const { user } = useAuth();

  const getProfilePicture = (firstName) => {
    if (!firstName) return '/images/profile-photo.jpg';
    
    const name = firstName.toLowerCase().trim();
    
    // Map specific admin names to their profile pictures
    const availableImages = {
      'bob': '/images/bob-pic.jpg',
      'alice': '/images/alice-pic.jpg',
      'john': '/images/john-pic.jpg',
      'sarah': '/images/sarah-pic.jpg',
      'mike': '/images/mike-pic.jpg',
      'lisa': '/images/lisa-pic.jpg',
    };
    
    return availableImages[name] || '/images/profile-photo.jpg';
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
      profilePicture: getProfilePicture(user.firstName),
    };
  }, [user]);
}
