import PropTypes from "prop-types";
import IncrementTd from "../td/IncrementTd";

export default function IncrementRow({ data, selectRow, selectedData }) {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  // Handle salary change
  const handleSalaryChange = () => {
    console.log(`Change salary for ${data.name}`);
    // Add your salary change logic here
  };

  const isSelected = selectedData && selectedData.includes(data.id);

  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : 'odd:bg-white even:bg-gray-50'}`}>
      <IncrementTd className="text-center">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            checked={isSelected}
            onChange={selectRow}
          />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {data.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <p className="font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <span className="text-gray-600">{data.employeeId}</span>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <span className="text-gray-600">{data.email}</span>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <span className="text-gray-600">{data.mobile}</span>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <span className="text-gray-600">{data.joiningDate}</span>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <span className="font-semibold text-gray-900">{formatCurrency(data.salary)}</span>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <span className="text-gray-600">{data.lastIncrementDate}</span>
      </IncrementTd>
      
      <IncrementTd className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={handleSalaryChange}
            className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
          >
            Change Salary
          </button>
          <button
            type="button"
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
            title="Edit"
          >
            <img 
              src="/icons/fi-sr-pencil.svg" 
              alt="Edit" 
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
      </IncrementTd>
    </tr>
  );
}

IncrementRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    employeeId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    joiningDate: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    lastIncrementDate: PropTypes.string.isRequired,
  }).isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
};
