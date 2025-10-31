import PropTypes from "prop-types";
import ExpenseListTd from "../td/ExpenseListTd";

export default function ExpenseListRow({ data, index, selectRow, selectedData }) {
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'declined':
        return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'pending':
        return 'text-orange-600 bg-orange-50 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return `৳${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <ExpenseListTd className="text-center font-medium">
        {index + 1}
      </ExpenseListTd>
      
      <ExpenseListTd>
        <div className="flex items-center gap-3">
          {data.visibleCheckbox && (
            <input
              type="checkbox"
              onChange={(e) => selectRow(data.id, e)}
              checked={Boolean(selectedData?.find((id) => data.id === id))}
              className="form-checkbox cursor-pointer accent-red-500 w-4 h-4 rounded"
            />
          )}
          <img
            src={data.image}
            alt={data.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{data.name}</p>
          </div>
        </div>
      </ExpenseListTd>
      
      <ExpenseListTd className="text-center font-mono">
        {data.employeeId}
      </ExpenseListTd>
      
      <ExpenseListTd className="text-center font-semibold text-gray-900">
        {formatCurrency(data.expenseAmount)}
      </ExpenseListTd>
      
      <ExpenseListTd className="text-center">
        <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
          {data.expenseCategory}
        </span>
      </ExpenseListTd>
      
      <ExpenseListTd className="text-center">
        {data.attachment ? (
          <a
            href={data.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            View
          </a>
        ) : (
          <span className="text-gray-400 text-xs">No attachment</span>
        )}
      </ExpenseListTd>
      
      <ExpenseListTd className="text-center">
        <span className={getStatusColor(data.status)}>
          {data.status}
        </span>
      </ExpenseListTd>
      
      <ExpenseListTd className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors"
            title="View Details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            type="button"
            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </ExpenseListTd>
    </tr>
  );
}

ExpenseListRow.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
};
