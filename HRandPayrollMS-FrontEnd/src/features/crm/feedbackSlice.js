import { apiSlice } from "../api/apiSlice";

export const extendedFeedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: (arg) => {
        // Handle both object and direct search term
        const params = typeof arg === "object" ? arg : { search: arg };
        let url = `/crm/tenant/customer-feedback/data?page=${params.page || 1}`;
        if (params.search) {
          url += `&search=${encodeURIComponent(params.search)}`;
        }
        return url;
      },
      providesTags: (result = [], error) => {
        if (error) return [{ type: "Feedback", id: "ERROR" }];
        return result?.feedback?.data
          ? [
              ...result.feedback.data.map(({ id }) => ({
                type: "Feedback",
                id,
              })),
              { type: "Feedback", id: "LIST" },
            ]
          : [{ type: "Feedback", id: "LIST" }];
      },
    }),
    addFeedback: builder.mutation({
      query: (body) => ({
        url: "/crm/tenant/customer-feedback",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Feedback", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFeedbacksQuery, useAddFeedbackMutation } =
  extendedFeedbackApi;
