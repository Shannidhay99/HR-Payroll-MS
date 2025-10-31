import { apiSlice } from "../api/apiSlice";

export const extendedCampaignsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (arg) => {
        // Handle both object and direct search term
        const params = typeof arg === "object" ? arg : { search: arg };
        let url = `/campaigns?page=${params.page || 1}`;
        if (params.search) {
          url += `&search=${encodeURIComponent(params.search)}`;
        }
        return url;
      },
      providesTags: (result = [], error) => {
        if (error) return [{ type: "Campaign", id: "ERROR" }];
        return result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "Campaign",
                id,
              })),
              { type: "Campaign", id: "LIST" },
            ]
          : [{ type: "Campaign", id: "LIST" }];
      },
    }),
    getCampaign: builder.query({
      query: (id) => `/campaigns/${id}`,
      providesTags: (result, error, id) => {
        if (error) {
          return [{ type: "Campaign", id: "ERROR" }];
        }
        return [{ type: "Campaign", id }];
      },
    }),
    addCampaign: builder.mutation({
      query: (body) => ({
        url: "/campaigns",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Campaign", id: "LIST" }],
    }),
    updateCampaign: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/campaigns/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Campaign", id },
        { type: "Campaign", id: "LIST" },
      ],
    }),
    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Campaign", id },
        { type: "Campaign", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCampaignsQuery,
  useGetCampaignQuery,
  useAddCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = extendedCampaignsApi;
