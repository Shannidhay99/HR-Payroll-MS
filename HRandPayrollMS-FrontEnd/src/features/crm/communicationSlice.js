import { apiSlice } from "../api/apiSlice";

export const extendedCommunicationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommunications: builder.query({
      query: (arg) => {
        // Handle both object and direct search term
        const params = typeof arg === "object" ? arg : { search: arg };
        let url = `/campaigns/communication/logs?page=${params.page || 1}`;
        if (params.search) {
          url += `&search=${encodeURIComponent(params.search)}`;
        }
        return url;
      },
      providesTags: (result = [], error) => {
        if (error) return [{ type: "Communication", id: "ERROR" }];
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "Communication",
                id,
              })),
              { type: "Communication", id: "LIST" },
            ]
          : [{ type: "Communication", id: "LIST" }];
      },
    }),
    getCommunication: builder.query({
      query: (id) => `/campaigns/communication/logs/${id}`,
      providesTags: (result, error, id) => {
        if (error) {
          return [{ type: "Communication", id: "ERROR" }];
        }
        return [{ type: "Communication", id }];
      },
    }),
    addCommunication: builder.mutation({
      query: (body) => ({
        url: "/campaigns/communication/logs",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Communication", id: "LIST" }],
    }),
    updateCommunication: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/campaigns/communication/logs/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Communication", id },
        { type: "Communication", id: "LIST" },
      ],
    }),
    deleteCommunication: builder.mutation({
      query: (id) => ({
        url: `/campaigns/communication/logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Communication", id },
        { type: "Communication", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCommunicationsQuery,
  useGetCommunicationQuery,
  useAddCommunicationMutation,
  useUpdateCommunicationMutation,
  useDeleteCommunicationMutation,
} = extendedCommunicationsApi;
