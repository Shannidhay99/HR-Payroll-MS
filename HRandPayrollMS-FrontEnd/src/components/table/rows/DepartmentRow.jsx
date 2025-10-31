import PropTypes from "prop-types";
import DepartmentTd from "../td/DepartmentTd";

export default function DepartmentRow({ data, index }) {
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium';
      case 'inactive':
        return 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium';
      default:
        return 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium';
    }
  };

  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <DepartmentTd className="text-center font-medium">
        {index + 1}
      </DepartmentTd>
      
      <DepartmentTd className="text-center">
        <p className="font-medium text-gray-900">{data.name}</p>
      </DepartmentTd>
      
      <DepartmentTd className="text-center">
        <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
          {data.code}
        </span>
      </DepartmentTd>
      
      <DepartmentTd className="text-center">
        {data.manager}
      </DepartmentTd>
      
      <DepartmentTd className="text-center font-semibold text-gray-900">
        {data.employees}
      </DepartmentTd>
      
      <DepartmentTd className="text-center">
        <span className={getStatusColor(data.status)}>
          {data.status}
        </span>
      </DepartmentTd>
      
      <DepartmentTd className="text-center">
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
            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </DepartmentTd>
    </tr>
  );
}

DepartmentRow.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
