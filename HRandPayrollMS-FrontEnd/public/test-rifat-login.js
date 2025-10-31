// Test utility to simulate user login
// Run this in browser console to set Rifat Bandhan's data

const rifatBandhanData = {
  id: 2,
  firstName: "Rifat",
  lastName: "Bandhan",
  email: "bandhan@gmail.com",
  phone: "01798674289",
  department: "Web Development",
  designation: "Web Developer",
  role_id: 1, // Employee
  created_at: "2025-06-22T00:00:00.000Z",
  status: 1
};

// Set the user data in localStorage
localStorage.setItem("user", JSON.stringify(rifatBandhanData));
localStorage.setItem("access_token", "fake_token_for_testing");

console.log("Rifat Bandhan user data set in localStorage");
console.log("User data:", rifatBandhanData);

// Reload to see changes
window.location.reload();
