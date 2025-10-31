import React from "react";
import PropTypes from "prop-types";
import TableData from "../td/TableData";
import AllEmployeeTd from "../td/AllemployeeTd";

const EmployeeReportRow = ({ data, selectRow, selectedData }) => {
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

  // Function to get performance color
  const getPerformanceColor = (performance) => {
    switch (performance?.toLowerCase()) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'average':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      {/* Employee Info with Checkbox and Image */}
      <TableData className="text-left">
        <AllEmployeeTd
          data={data.name}
          selectRow={selectRow}
          selectedData={selectedData}
        />
      </TableData>

      {/* Employee ID */}
      <TableData>
        <span className="text-gray-600 font-mono text-sm">{data.employeeId}</span>
      </TableData>

      {/* Department */}
      <TableData>
        <span className="text-gray-600">{data.department}</span>
      </TableData>

      {/* Designation */}
      <TableData>
        <span className="text-gray-600">{data.designation}</span>
      </TableData>

      {/* Status */}
      <TableData>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(data.status)}`}>
          {data.status}
        </span>
      </TableData>

      {/* Joining Date */}
      <TableData>
        <span className="text-gray-600 text-sm">{data.joiningDate}</span>
      </TableData>

      {/* Salary */}
      <TableData>
        <span className="text-gray-900 font-semibold">{data.salary}</span>
      </TableData>

      {/* Performance */}
      <TableData>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPerformanceColor(data.performance)}`}>
            {data.performance}
          </span>
          <div className="text-xs text-gray-500">
            <div>Attendance: {data.attendanceRate}%</div>
            <div>Projects: {data.projectsCompleted}</div>
          </div>
        </div>
      </TableData>

      {/* Actions */}
      <TableData>
        <div className="flex items-center gap-3 justify-center">
          <button className="p-2 hover:bg-gray-100 rounded-full" title="Edit">
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-full" title="Delete">
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
};

EmployeeReportRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      visibleCheckbox: PropTypes.bool,
      id: PropTypes.number.isRequired,
    }).isRequired,
    employeeId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    joiningDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    performance: PropTypes.string.isRequired,
    attendanceRate: PropTypes.number.isRequired,
    projectsCompleted: PropTypes.number.isRequired,
    lastReview: PropTypes.string.isRequired,
  }).isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
};

EmployeeReportRow.defaultProps = {
  selectRow: () => {},
  selectedData: [],
};

export default EmployeeReportRow;
