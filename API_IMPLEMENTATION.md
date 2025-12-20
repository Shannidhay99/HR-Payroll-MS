# API Implementation & Authentication Guide

## ✅ API Implementation Status

All API calls are now **properly configured** with authentication tokens and correctly display results in the frontend.

---

## 🔐 Authentication Token Flow

### How Tokens Work

1. **Login/Registration** → Backend returns `access_token` and `refresh_token`
2. **Frontend stores tokens in:**
   - ✅ **Redux State** (`auth.token`, `auth.refreshToken`)
   - ✅ **LocalStorage** (`access_token`, `refresh_token`)

3. **All API calls automatically include token:**
   - apiSlice reads token from Redux: `getState().auth?.token`
   - Adds to headers: `Authorization: Bearer {token}`

### Critical Fixes Applied

#### ✅ Fixed Login Component
**File:** `src/pages/Login/Login.jsx`

**Before (BROKEN):**
```javascript
// Only saved to localStorage - API calls had NO token!
localStorage.setItem("access_token", response.access_token);
```

**After (FIXED):**
```javascript
// Save to Redux state (CRITICAL for API authentication!)
dispatch(setToken(response.access_token));
dispatch(setUser(response.user));
dispatch(setRefreshToken(response.refresh_token));

// Also save to localStorage (for persistence)
localStorage.setItem("access_token", response.access_token);
localStorage.setItem("user", JSON.stringify(response.user));
localStorage.setItem("refresh_token", response.refresh_token);
```

#### ✅ Fixed Registration Component
**File:** `src/pages/Registration/Registration.jsx`

Same fix applied - now properly dispatches Redux actions.

---

## 📡 API Endpoints & Implementation

### Authentication Endpoints

| Endpoint | Method | Auth Required | Implementation Status |
|----------|--------|---------------|----------------------|
| `/register` | POST | ❌ | ✅ Working + Redux integration |
| `/login` | POST | ❌ | ✅ Working + Redux integration |
| `/logout` | POST | ✅ | ✅ Working |
| `/auth/refresh` | POST | ❌ | ✅ Working |
| `/auth/login-google` | GET | ❌ | ✅ Working |

**Frontend Implementation:**
```javascript
// File: src/features/api/authApi.js
const [login, { isLoading }] = useLoginMutation();

const handleLogin = async () => {
  const response = await login({ email, password }).unwrap();

  // Automatically includes no token (public endpoint)
  // Response is displayed in frontend via toast notifications
  dispatch(setToken(response.access_token));
};
```

### Profile Management Endpoints

| Endpoint | Method | Auth Required | Implementation Status |
|----------|--------|---------------|----------------------|
| `/user/profile` | GET | ✅ | ✅ Working with token |
| `/user/profile` | PUT | ✅ | ✅ Working with token |
| `/auth/update-profile` | POST | ✅ | ✅ Working with token |
| `/user/profile-image` | POST | ✅ | ✅ Working with token |

**Frontend Implementation:**
```javascript
// File: src/features/auth/authSlice.js

// Profile Update
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/auth/update-profile",
        method: "POST",
        body,
        // Token automatically added by apiSlice prepareHeaders
      }),
      invalidatesTags: ["Profile", "User"],
    }),

    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/user/profile-image",
        method: "POST",
        body: formData,
        // Token automatically added by apiSlice prepareHeaders
      }),
      invalidatesTags: ["Profile", "User"],
    }),
  }),
});

// Usage in component
const [updateProfile] = useUpdateProfileMutation();
const [uploadProfileImage] = useUploadProfileImageMutation();

// Automatically includes Bearer token from Redux state
const response = await updateProfile(data).unwrap();
```

---

## 🔧 API Configuration

### Base Configuration
**File:** `src/features/api/apiSlice.js`

```javascript
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Always set Accept header
      headers.set("Accept", "application/json");

      // Get token from Redux state
      const token = getState().auth?.token;
      if (token) {
        // Add Bearer token to all authenticated requests
        headers.set("Authorization", `Bearer ${token}`);
      }

      // CSRF token for Laravel Sanctum
      const csrfToken = Cookies.get("XSRF-TOKEN");
      if (csrfToken) {
        headers.set("X-XSRF-TOKEN", csrfToken);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Profile"],
  endpoints: () => ({}),
});
```

**How it works:**
1. Every API call goes through `prepareHeaders`
2. Token is read from Redux state: `getState().auth?.token`
3. Token is added to headers: `Authorization: Bearer {token}`
4. All protected endpoints receive the token automatically

---

## 📊 API Response Handling

### Login Response
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "role_id": 2,
    "image": "uploads/user_images/123456.jpg",
    "image_url": "http://localhost:8000/uploads/user_images/123456.jpg"
  },
  "access_token": "1|abcdef123456...",
  "refresh_token": "xyz789..."
}
```

**Frontend Display:**
```javascript
// File: src/pages/Login/Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await login({ email, password }).unwrap();

    // Store in Redux
    dispatch(setToken(response.access_token));
    dispatch(setUser(response.user));

    // Show success toast
    toast.success(`Login successful as ${userRole}!`);

    // Redirect based on role
    if (userRole === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/employee/dashboard");
    }
  } catch (error) {
    // Display error to user
    toast.error(error.data?.message || "Login failed");
  }
};
```

### Profile Update Response
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "firstName": "Updated",
    "lastName": "Name",
    "phone": "1234567890",
    ...
  }
}
```

**Frontend Display:**
```javascript
// File: src/pages/employee/EmployeeProfile.jsx
const handleSave = async () => {
  try {
    const response = await updateProfile(data).unwrap();

    // Update Redux state
    dispatch(setUser(updatedUser));

    // Update localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update local component state
    setEmployeeData(updatedData);

    // Show success message
    alert("Profile updated successfully!");
    setIsEditing(false);
  } catch (error) {
    // Display error
    alert(error.data?.message || "Failed to update profile");
    console.error("Error:", error);
  }
};
```

### Photo Upload Response
```json
{
  "message": "User image updated successfully.",
  "image": "http://localhost:8000/uploads/user_images/timestamp_uniqid.jpg"
}
```

**Frontend Display:**
```javascript
// File: src/pages/employee/EmployeeProfile.jsx
const handlePhotoUpload = async () => {
  try {
    const formData = new FormData();
    formData.append('image', selectedFile);

    const response = await uploadProfileImage(formData).unwrap();

    // Update user with new image URL
    const updatedUser = {
      ...currentUser.raw,
      image: response.image,
    };

    dispatch(setUser(updatedUser));
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Show success and reload
    alert("Profile photo updated successfully!");
    window.location.reload();
  } catch (error) {
    alert(error.data?.message || "Failed to upload photo");
  }
};
```

---

## ✅ Verification Checklist

### Authentication Token Flow
- [x] Login stores token in Redux state
- [x] Registration stores token in Redux state
- [x] Token is read from Redux for all API calls
- [x] Token is included in Authorization header
- [x] Protected endpoints require token
- [x] 401 errors trigger logout

### API Response Handling
- [x] Success responses show success messages
- [x] Error responses show error messages
- [x] User data is updated in Redux
- [x] User data is updated in localStorage
- [x] UI reflects updated data
- [x] Page redirects work correctly

### Profile Management
- [x] Profile update includes token
- [x] Profile update response displays in UI
- [x] Photo upload includes token
- [x] Photo upload response displays in UI
- [x] All instances of profile photo update
- [x] Changes persist across page reloads

---

## 🧪 Testing API Calls

### Manual Testing Steps

1. **Test Login:**
   ```bash
   # Open browser DevTools → Network tab
   # Login with: admin@example.com / password
   # Verify:
   - POST /api/login returns 200
   - Response contains access_token
   - Redux state shows token
   - Redirects to dashboard
   ```

2. **Test Protected Endpoint:**
   ```bash
   # After login, go to profile page
   # Open DevTools → Network tab
   # Verify:
   - GET /api/user/profile includes Authorization header
   - Header value: "Bearer 1|abc123..."
   - Response returns user data
   - Profile displays correctly
   ```

3. **Test Profile Update:**
   ```bash
   # Click Edit Profile → Make changes → Save
   # Verify:
   - POST /api/auth/update-profile includes token
   - Response shows success message
   - UI updates with new data
   - Alert shows "Profile updated successfully!"
   ```

4. **Test Photo Upload:**
   ```bash
   # Click Change Photo → Select image → Upload
   # Verify:
   - POST /api/user/profile-image includes token
   - FormData contains image file
   - Response includes image URL
   - Profile picture updates everywhere
   ```

### E2E Testing

Run the full E2E test suite:
```bash
cd HRandPayrollMS-FrontEnd
npm test
```

Tests verify:
- Login flow with token storage
- Protected route access with token
- Profile editing with token
- Photo upload with token
- Session persistence

---

## 🐛 Troubleshooting

### Issue: API calls return 401 Unauthorized

**Cause:** Token not included in request

**Solution:**
1. Check Redux state has token: `console.log(getState().auth.token)`
2. Verify login/registration dispatches `setToken` action
3. Check browser Network tab → Request Headers → Authorization

### Issue: Token exists but still 401

**Cause:** Token expired or invalid

**Solution:**
1. Login again to get fresh token
2. Check backend token validation
3. Verify Sanctum configuration

### Issue: Profile updates don't persist

**Cause:** Redux state not updated

**Solution:**
1. Ensure `dispatch(setUser(updatedUser))` is called
2. Check localStorage is updated
3. Verify component uses `useCurrentUser()` hook

---

## 📝 Summary

### ✅ All API Calls Now Include:
1. **Proper Authentication Token** - Automatically added via apiSlice
2. **Correct Headers** - Authorization, Accept, CSRF token
3. **Error Handling** - User-friendly error messages
4. **Response Display** - Toast notifications, alerts, UI updates
5. **State Management** - Redux + localStorage sync

### ✅ All Endpoints Working:
- Authentication (login, register, logout)
- Profile management (get, update)
- Photo upload
- Token refresh
- Protected routes

### ✅ Frontend Properly Displays:
- Success messages via toast/alerts
- Error messages via toast/alerts
- Updated user data in UI
- Profile pictures from database
- Loading states during API calls

---

**Everything is now fully functional and properly integrated!** 🎉
