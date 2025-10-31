import React from "react";
import PropTypes from "prop-types";
import AllEmployeeTd from "../td/AllemployeeTd";
import TableData from "../td/TableData";

const LeaveReportRow = ({ data, selectedData, selectRow }) => {
  const {
    serial,
    name,
    employeeId,
    department,
    designation,
    leaveType,
    startDate,
    endDate,
    duration,
    leaveReason,
    status,
    appliedDate,
  } = data;

  // Determine status color based on leave status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return "text-green-600 bg-green-100";
      case 'pending':
        return "text-yellow-600 bg-yellow-100";
      case 'rejected':
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Determine leave type color
  const getLeaveTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'annual leave':
        return "text-blue-600 bg-blue-100";
      case 'sick leave':
        return "text-green-600 bg-green-100";
      case 'emergency leave':
        return "text-red-600 bg-red-100";
      case 'casual leave':
        return "text-purple-600 bg-purple-100";
      case 'maternity leave':
        return "text-pink-600 bg-pink-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Serial */}
      <TableData className="text-sm font-medium text-gray-900 min-w-[60px]">
        {serial}
      </TableData>

      {/* Employee Name with Image and Checkbox */}
      <TableData className="text-left min-w-[200px]">
        <AllEmployeeTd data={name} selectedData={selectedData} selectRow={selectRow} />
      </TableData>

      {/* Employee ID */}
      <TableData className="text-sm font-mono text-gray-700 min-w-[120px]">
        <span className="px-2 py-1 bg-gray-50 rounded text-gray-600">
          {employeeId}
        </span>
      </TableData>

      {/* Department */}
      <TableData className="text-sm text-gray-700 min-w-[140px]">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {department}
        </span>
      </TableData>

      {/* Designation */}
      <TableData className="text-sm text-gray-700 min-w-[130px]">
        <span className="text-gray-600">{designation}</span>
      </TableData>

      {/* Leave Type */}
      <TableData className="text-sm text-gray-700 min-w-[130px]">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(leaveType)}`}>
          {leaveType}
        </span>
      </TableData>

      {/* Start Date */}
      <TableData className="text-sm text-gray-700 min-w-[110px]">
        <span className="font-medium">{formatDate(startDate)}</span>
      </TableData>

      {/* End Date */}
      <TableData className="text-sm text-gray-700 min-w-[110px]">
        <span className="font-medium">{formatDate(endDate)}</span>
      </TableData>

      {/* Duration */}
      <TableData className="text-sm font-medium text-center text-gray-900 min-w-[80px]">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
          {duration} {duration === 1 ? 'day' : 'days'}
        </span>
      </TableData>

      {/* Leave Reason */}
      <TableData className="text-sm text-gray-700 min-w-[200px]">
        <div className="max-w-[180px]">
          <span className="text-gray-600 line-clamp-2" title={leaveReason}>
            {leaveReason}
          </span>
        </div>
      </TableData>

      {/* Status */}
      <TableData className="text-sm font-medium text-center min-w-[100px]">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </TableData>

      {/* Applied Date */}
      <TableData className="text-sm text-gray-700 min-w-[110px]">
        <span className="text-gray-500">{formatDate(appliedDate)}</span>
      </TableData>

      {/* Actions */}
      <TableData className="min-w-[120px]">
        <div className="flex items-center gap-3 justify-center">
          <button className="p-3 hover:bg-gray-100 rounded-full transition-colors" title="Edit">
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-5 h-5" />
          </button>
          <button className="p-3 hover:bg-red-50 rounded-full transition-colors" title="Delete">
            <img
              src="/icons/fi-sr-trash.svg"
              alt="Delete"
              className="w-5 h-5"
            />
          </button>
        </div>
      </TableData>
    </tr>
  );
};

LeaveReportRow.propTypes = {
  data: PropTypes.shape({
    serial: PropTypes.number.isRequired,
    name: PropTypes.object.isRequired,
    employeeId: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    leaveType: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    leaveReason: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    appliedDate: PropTypes.string.isRequired,
  }).isRequired,
  selectedData: PropTypes.array.isRequired,
  selectRow: PropTypes.func.isRequired,
};

export default LeaveReportRow;
