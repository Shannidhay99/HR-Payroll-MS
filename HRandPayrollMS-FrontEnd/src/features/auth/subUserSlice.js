import { apiSlice } from "../api/apiSlice";

export const extendedUsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (arg) => {
        // Handle both object and direct search term
        const params = typeof arg === "object" ? arg : { search: arg };
        let url = `/users-manage?page=${params.page || 1}`;
        if (params.search) {
          url += `&search=${encodeURIComponent(params.search)}`;
        }
        return url;
      },
      providesTags: (result = [], error) => {
        if (error) return [{ type: "User", id: "ERROR" }];
        return result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({
                type: "User",
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }];
      },
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = extendedUsersApi;
