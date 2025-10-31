import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// RTK Query endpoints for auth
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile", "Dashboard"],
    }),
    loginWithGoogle: builder.mutation({
      query: (body) => ({
        url: "/auth/login-google",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile", "Dashboard"],
    }),
    getLoggedInUser: builder.query({
      query: () => "/user/profile",
      providesTags: ["Profile", "User"],
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "/logout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile", "User", "Dashboard"],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/change-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/auth/update-profile",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
  }),
  overrideExisting: false,
});

// Redux slice for storing token and user
const initialState = {
  token: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refresh_token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginWithGoogleMutation,
  useLogoutMutation,
  useGetLoggedInUserQuery,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = extendedApiSlice;

export const { setToken, setRefreshToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
