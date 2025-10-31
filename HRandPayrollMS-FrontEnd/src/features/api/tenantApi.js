import { apiSlice } from './apiSlice';

export const tenantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTenants: builder.query({
      query: () => '/tenants',
      providesTags: ['Tenants'],
    }),
    getTenant: builder.query({
      query: (id) => `/tenants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tenants', id }],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTenantQuery,
} = tenantApi;