import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    googleLogin: builder.mutation({
      query: () => ({
        url: '/auth/login-google',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
    googleCallback: builder.mutation({
      query: (token) => ({
        url: '/auth/google/callback',
        method: 'GET',
        params: { token },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation,
  useGoogleLoginMutation,
  useGoogleCallbackMutation,
} = authApi;
