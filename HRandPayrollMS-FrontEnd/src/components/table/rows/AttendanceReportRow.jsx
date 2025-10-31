import React from "react";
import PropTypes from "prop-types";
import AllEmployeeTd from "../td/AllemployeeTd";
import TableData from "../td/TableData";
import IconButton from "../../buttons/IconButton";

const AttendanceReportRow = ({ data, selectedData, selectRow }) => {
  const {
    serial,
    name,
    employeeId,
    department,
    designation,
    totalWorkingDays,
    presentDays,
    absentDays,
    onTimeCheckIn,
    lateCheckIn,
    onTimeLeave,
    earlyLeave,
    attendanceRate,
  } = data;

  // Determine attendance status color based on attendance rate
  const getAttendanceColor = (rate) => {
    if (rate >= 95) return "text-green-600 bg-green-100";
    if (rate >= 85) return "text-blue-600 bg-blue-100";
    if (rate >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
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

      {/* Total Working Days */}
      <TableData className="text-sm font-medium text-center text-gray-900 min-w-[90px]">
        {totalWorkingDays}
      </TableData>

      {/* Present Days */}
      <TableData className="text-sm font-medium text-center min-w-[80px]">
        <span className="text-green-600 font-semibold" title={`${presentDays} days present`}>
          {presentDays}
        </span>
      </TableData>

      {/* Absent Days */}
      <TableData className="text-sm font-medium text-center min-w-[80px]">
        <span className="text-red-600 font-semibold" title={`${absentDays} days absent`}>
          {absentDays}
        </span>
      </TableData>

      {/* On-Time Check In Days */}
      <TableData className="text-sm font-medium text-center min-w-[90px]">
        <span className="text-green-600 font-semibold" title={`${onTimeCheckIn} on-time check-ins`}>
          {onTimeCheckIn}
        </span>
      </TableData>

      {/* Late Check In Days */}
      <TableData className="text-sm font-medium text-center min-w-[90px]">
        <span className="text-orange-600 font-semibold" title={`${lateCheckIn} late check-ins`}>
          {lateCheckIn}
        </span>
      </TableData>

      {/* On-Time Leave Days */}
      <TableData className="text-sm font-medium text-center min-w-[90px]">
        <span className="text-green-600 font-semibold" title={`${onTimeLeave} on-time departures`}>
          {onTimeLeave}
        </span>
      </TableData>

      {/* Early Leave Days */}
      <TableData className="text-sm font-medium text-center min-w-[90px]">
        <span className="text-orange-600 font-semibold" title={`${earlyLeave} early departures`}>
          {earlyLeave}
        </span>
      </TableData>

      {/* Attendance Rate */}
      <TableData className="text-sm font-medium text-center min-w-[100px]">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAttendanceColor(attendanceRate)}`}>
          {attendanceRate}%
        </span>
      </TableData>

      {/* Actions - Following All Employee pattern */}
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

AttendanceReportRow.propTypes = {
  data: PropTypes.shape({
    serial: PropTypes.number.isRequired,
    name: PropTypes.object.isRequired,
    employeeId: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    totalWorkingDays: PropTypes.number.isRequired,
    presentDays: PropTypes.number.isRequired,
    absentDays: PropTypes.number.isRequired,
    onTimeCheckIn: PropTypes.number.isRequired,
    lateCheckIn: PropTypes.number.isRequired,
    onTimeLeave: PropTypes.number.isRequired,
    earlyLeave: PropTypes.number.isRequired,
    attendanceRate: PropTypes.number.isRequired,
  }).isRequired,
  selectedData: PropTypes.array.isRequired,
  selectRow: PropTypes.func.isRequired,
};

export default AttendanceReportRow;
