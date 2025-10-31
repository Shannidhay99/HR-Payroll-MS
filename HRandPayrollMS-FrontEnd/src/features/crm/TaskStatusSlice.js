import { apiSlice } from "../api/apiSlice";

export const extendedTaskStatusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTaskStatus: builder.query({
      query: () => `/task-statuses`,
      providesTags: (result = [], error) => {
        if (error) return [{ type: "Task Status", id: "ERROR" }];
        return result
          ? [
              ...result.map(({ id }) => ({ type: "Task Status", id })),
              { type: "Task Status", id: "LIST" },
            ]
          : [{ type: "Task Status", id: "LIST" }];
      },
    }),

    addTaskStatus: builder.mutation({
      query: (body) => ({
        url: "/task-statuses",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task Status", id: "LIST" }],
    }),

    updateTaskStatus: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/task-statuses/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task Status", id },
        { type: "Task Status", id: "LIST" },
      ],
    }),

    deleteTaskStatus: builder.mutation({
      query: (id) => ({
        url: `/task-statuses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Task Status", id },
        { type: "Task Status", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTaskStatusQuery,
  useAddTaskStatusMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskStatusMutation,
} = extendedTaskStatusApi;
