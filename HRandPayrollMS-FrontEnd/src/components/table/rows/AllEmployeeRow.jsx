import PropTypes from "prop-types";
import TableData from "../td/TableData";
import AllEmployeeTd from "../td/AllemployeeTd";
import { useState } from "react";

export default function AllEmployeeRow({ selectRow, selectedData, data, updateEmployeeStatus }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus) => {
    updateEmployeeStatus(data.id, newStatus);
    setIsEditingStatus(false);
  };
  return (
    <tr className="hover:bg-gray-50">
      <TableData className="text-left">
        <AllEmployeeTd
          data={data.name}
          selectRow={selectRow}
          selectedData={selectedData}
        />
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.email}</span>
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.employeeId}</span>
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.mobile}</span>
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.department}</span>
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.designation}</span>
      </TableData>
      <TableData>
        {isEditingStatus ? (
          <select
            defaultValue={data.status}
            className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleStatusChange(e.target.value)}
            onBlur={() => setIsEditingStatus(false)}
            autoFocus
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        ) : (
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer border ${getStatusColor(data.status)}`}
            onClick={() => setIsEditingStatus(true)}
            title="Click to edit"
          >
            {data.status}
          </span>
        )}
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.joiningDate}</span>
      </TableData>
      <TableData>
        <div className="flex items-center gap-3 justify-center">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-full">
            <img
              src="/icons/fi-sr-trash.svg"
              alt="Delete"
              className="w-4 h-4"
            />
          </button>
        </div>
      </TableData>
    </tr>
  );
}

AllEmployeeRow.propTypes = {
  data: PropTypes.object.isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
  updateEmployeeStatus: PropTypes.func.isRequired,
};
