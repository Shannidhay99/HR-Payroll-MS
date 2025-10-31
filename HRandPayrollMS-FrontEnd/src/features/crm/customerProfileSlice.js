import { apiSlice } from "../api/apiSlice";

export const extendedCustomerProfileSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomersProfile: builder.query({
      query: (arg) => {
        // Handle both object and direct search term
        const params = typeof arg === "object" ? arg : { search: arg };
        let url = `/crm/tenant/customer-profile?page=${params.page || 1}`;
        if (params.search) {
          url += `&search=${encodeURIComponent(params.search)}`;
        }
        return url;
      },
      providesTags: (result = [], error) => {
        if (error) return [{ type: "Customers Profile", id: "ERROR" }];
        return result?.customer?.data
          ? [
              ...result.customer.data.map(({ id }) => ({
                type: "Customers Profile",
                id,
              })),
              { type: "Customers Profile", id: "LIST" },
            ]
          : [{ type: "Customers Profile", id: "LIST" }];
      },
    }),
    deleteCustomersProfile: builder.mutation({
      query: (id) => ({
        url: `/purchase-returns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Customers Profile", id },
        { type: "Customers Profile", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersProfileQuery,
  useDeleteCustomersProfileMutation,
} = extendedCustomerProfileSliceApi;
