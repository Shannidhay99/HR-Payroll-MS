import React from "react";
import EmployeeAttendanceTd from "../tds/EmployeeAttendanceTd";

function EmployeeAttendanceRow({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Half Day':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Late':
        return (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Absent':
        return (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'Half Day':
        return (
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
      {/* Date */}
      <EmployeeAttendanceTd>
        <div className="text-sm font-medium text-gray-900">{data.date}</div>
      </EmployeeAttendanceTd>

      {/* Time In */}
      <EmployeeAttendanceTd>
        <span className="text-sm text-gray-700 font-medium">{data.timeIn}</span>
      </EmployeeAttendanceTd>

      {/* Time Out */}
      <EmployeeAttendanceTd>
        <span className="text-sm text-gray-700 font-medium">{data.timeOut}</span>
      </EmployeeAttendanceTd>

      {/* Total Hours */}
      <EmployeeAttendanceTd>
        <span className="text-sm font-semibold text-gray-900">{data.totalHours}</span>
      </EmployeeAttendanceTd>

      {/* Status */}
      <EmployeeAttendanceTd>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(data.status)}`}>
          {getStatusIcon(data.status)}
          {data.status}
        </span>
      </EmployeeAttendanceTd>

      {/* Location */}
      <EmployeeAttendanceTd>
        <span className="text-sm text-gray-600">{data.location}</span>
      </EmployeeAttendanceTd>
    </tr>
  );
}

export default EmployeeAttendanceRow;
