import { apiSlice } from "../api/apiSlice";

export const extendedTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (arg) => {
        const params = typeof arg === "object" ? arg : { search: arg };
        let url = `/tasks`;
        if (params.search) {
          url += `?search=${encodeURIComponent(params.search)}`;
        }
        return url;
      },
      providesTags: (result = [], error) => {
        if (error) return [{ type: "Task", id: "ERROR" }];
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Task", id })),
              { type: "Task", id: "LIST" },
            ]
          : [{ type: "Task", id: "LIST" }];
      },
    }),

    addTask: builder.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
    }),

    addTaskAttachment: builder.mutation({
      query: (formData) => ({
        url: "/task-attachments",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    // Mutation for adding a comment
    addTaskComment: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: `/comments/${id}`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }], // Invalidate cached task data
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useAddTaskAttachmentMutation,
  useAddTaskCommentMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = extendedTaskApi;
