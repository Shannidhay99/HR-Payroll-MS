import { useEffect, useState } from 'react';
import { useGetTenantsQuery } from '../../features/api/tenantApi';

const TenantSelect = ({ value, onChange, error }) => {
  const { data: tenants, isLoading, isError } = useGetTenantsQuery();
  const [touched, setTouched] = useState(false);

  // Show error only after field is touched or if error is passed explicitly
  const showError = (touched || error) && !value;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 block">
        Select Company/Organization
        <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          onBlur={() => setTouched(true)}
          className={`w-full px-4 py-3 rounded-lg border ${
            showError ? 'border-red-500' : 'border-gray-300'
          } focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-sm`}
          disabled={isLoading}
          required
        >
          <option value="">Select an organization</option>
          {tenants?.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {tenant.name || `Organization #${tenant.id}`}
            </option>
          ))}
        </select>
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-red-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      {showError && (
        <p className="text-red-500 text-xs mt-1">
          Please select an organization
        </p>
      )}
      {isError && (
        <p className="text-red-500 text-xs mt-1">
          Failed to load organizations. Please try again.
        </p>
      )}
    </div>
  );
};

export default TenantSelect;