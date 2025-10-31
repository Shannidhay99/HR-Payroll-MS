import { useMemo } from 'react';

export const useCurrentUser = () => {
  return useMemo(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    // Debug logging
    console.log("Current user data from localStorage:", user);
    console.log("User firstName:", user.firstName);
    console.log("User lastName:", user.lastName);
    
    // Determine profile picture based on first name
    const getProfilePicture = (firstName, lastName) => {
      if (!firstName) return '/images/profile-photo.jpg';
      
      const name = firstName.toLowerCase().trim();
      const fullName = lastName ? `${firstName} ${lastName}`.toLowerCase().trim() : name;
      
      console.log("Looking for profile picture with name:", name, "fullName:", fullName);
      
      const availableImages = {
        'sadia': '/images/sadia-pic.jpg',
        'shahriar': '/images/shahriar-pic.jpg',
        'lina': '/images/lina-pic.jpg',
        'bandhan': '/images/bandhan-pic.jpg',
        'rifat': '/images/bandhan-pic.jpg', // Same picture for Rifat Bandhan
        'rifat bandhan': '/images/bandhan-pic.jpg', // Full name match
        'auntu': '/images/auntu-pic.jpg',
      };
      
      // Try full name first, then first name
      const result = availableImages[fullName] || availableImages[name] || '/images/profile-photo.jpg';
      console.log("Selected profile picture:", result);
      return result;
    };
    
    return {
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      fullName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Employee',
      email: user.email || 'employee@company.com',
      phone: user.phone || 'Not Available',
      employeeId: `EMP-${user.id || '000'}`,
      department: user.department || 'Not Assigned',
      designation: user.designation || 'Employee',
      joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Not Available',
      profilePicture: getProfilePicture(user.firstName, user.lastName),
      roleId: user.role_id,
      isAdmin: user.role_id === 2,
      isEmployee: user.role_id === 1,
      raw: user
    };
  }, []);
};
