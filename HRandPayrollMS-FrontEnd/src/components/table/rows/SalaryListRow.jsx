import PropTypes from "prop-types";
import SalaryListTd from "../td/SalaryListTd";

export default function SalaryListRow({ data, index }) {
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'rejected':
        return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <SalaryListTd className="text-center font-medium">
        {index + 1}
      </SalaryListTd>
      
      <SalaryListTd className="text-center">
        <p className="font-medium text-gray-900">{data.name}</p>
      </SalaryListTd>
      
      <SalaryListTd className="text-center">
        <span className="text-gray-600">{data.employeeId}</span>
      </SalaryListTd>
      
      <SalaryListTd className="text-center font-semibold text-gray-900">
        {formatCurrency(data.salary)}
      </SalaryListTd>
      
      <SalaryListTd className="text-center">
        <span className={`font-semibold ${data.adjustmentAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {data.adjustmentAmount >= 0 ? '+' : ''}{formatCurrency(data.adjustmentAmount)}
        </span>
      </SalaryListTd>
      
      <SalaryListTd className="text-center">
        <span className="text-sm text-gray-600">{data.adjustmentReason}</span>
      </SalaryListTd>
      
      <SalaryListTd className="text-center font-bold text-gray-900">
        {formatCurrency(data.afterAdjustmentSalary)}
      </SalaryListTd>
      
      <SalaryListTd className="text-center">
        <span className={getStatusColor(data.status)}>
          {data.status}
        </span>
      </SalaryListTd>
      
      <SalaryListTd className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            type="button"
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
            title="View Details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            type="button"
            className="p-1 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors"
            title="Download Payslip"
          >
            <img 
              src="/icons/download.svg" 
              alt="Download" 
              className="w-4 h-4"
            />
          </button>
          <button
            type="button"
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
            title="Delete"
          >
            <img 
              src="/icons/fi-sr-trash.svg" 
              alt="Delete" 
              className="w-4 h-4"
            />
          </button>
        </div>
      </SalaryListTd>
    </tr>
  );
}

SalaryListRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    employeeId: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    adjustmentAmount: PropTypes.number.isRequired,
    adjustmentReason: PropTypes.string.isRequired,
    afterAdjustmentSalary: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
