import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Get base URL from .env
const baseUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      // headers.set("Content-Type", "application/json");
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
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

// Initialize CSRF token before any API calls (for Sanctum)
export const initializeCsrfToken = async () => {
  try {
    await fetch(`${baseUrl.replace(/\/api$/, "")}/sanctum/csrf-cookie`, {
      credentials: "include",
    });
  } catch (error) {
    console.warn("CSRF cookie fetch failed:", error?.message || error);
  }
};
