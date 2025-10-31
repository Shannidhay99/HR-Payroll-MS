import PropTypes from "prop-types";
import TableData from "../td/TableData";
import LeaveApplicationTd from "../td/LeaveApplicationTd";
import { useState } from "react";

export default function LeaveApplicationRow({ selectRow, selectedData, data, updateRecord }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingLeaveCount, setIsEditingLeaveCount] = useState(false);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-600';
      case 'declined':
        return 'text-red-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleStatusChange = (newStatus) => {
    updateRecord(data.id, 'status', newStatus);
    setIsEditingStatus(false);
  };

  const handleLeaveCountChange = (newCount) => {
    if (newCount && !isNaN(newCount) && parseInt(newCount) > 0) {
      updateRecord(data.id, 'leaveCount', newCount);
    }
    setIsEditingLeaveCount(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <TableData className="text-left">
        <LeaveApplicationTd
          data={data.name}
          selectRow={selectRow}
          selectedData={selectedData}
        />
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.employeeId}</span>
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.startDate}</span>
      </TableData>
      
      <TableData>
        <span className="text-gray-600">{data.endDate}</span>
      </TableData>
      <TableData>
        {isEditingLeaveCount ? (
          <input
            type="number"
            defaultValue={data.leaveCount}
            className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onBlur={(e) => handleLeaveCountChange(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLeaveCountChange(e.target.value);
              }
            }}
            autoFocus
          />
        ) : (
          <span 
            className="text-gray-600 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
            onClick={() => setIsEditingLeaveCount(true)}
            title="Click to edit"
          >
            {data.leaveCount}
          </span>
        )}
      </TableData>
      <TableData>
        <span className="text-gray-600">{data.leaveReason}</span>
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
            <option value="Approved">Approved</option>
            <option value="Declined">Declined</option>
            <option value="Pending">Pending</option>
          </select>
        ) : (
          <span 
            className={`font-medium cursor-pointer hover:bg-gray-100 px-2 py-1 rounded ${getStatusColor(data.status)}`}
            onClick={() => setIsEditingStatus(true)}
            title="Click to edit"
          >
            {data.status}
          </span>
        )}
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

LeaveApplicationRow.propTypes = {
  data: PropTypes.object.isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
  updateRecord: PropTypes.func.isRequired,
};
