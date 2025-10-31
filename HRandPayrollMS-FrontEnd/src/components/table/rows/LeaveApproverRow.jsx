import PropTypes from "prop-types";
import TableData from "../td/TableData";
import LeaveApproverTd from "../td/LeaveApproverTd";
import { useState } from "react";

export default function LeaveApproverRow({ data, updateRecord }) {
  const [isEditingPriority, setIsEditingPriority] = useState(false);

  const handlePriorityChange = (newPriority) => {
    if (newPriority && !isNaN(newPriority) && parseInt(newPriority) > 0) {
      updateRecord(data.id, "priority", parseInt(newPriority));
      setIsEditingPriority(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Serial */}
      <TableData className="text-gray-600 font-medium text-center">
        {data.serial}
      </TableData>

      {/* Approver */}
      <TableData className="text-center">
        <div className="flex items-center justify-center">
          {data.image && (
            <img
              src={data.image}
              alt={data.approverName}
              className="w-8 h-8 rounded-full mr-3"
            />
          )}
          <span className="font-medium text-gray-900">
            {data.approverName}
          </span>
        </div>
      </TableData>

      {/* Employee ID */}
      <TableData className="text-gray-600 font-mono text-center">
        {data.employeeId}
      </TableData>

      {/* Department */}
      <TableData className="text-gray-600 text-center">
        <div className="flex justify-center">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
            {data.department}
          </span>
        </div>
      </TableData>

      {/* Priority (editable cell) */}
      <LeaveApproverTd
        isEditing={isEditingPriority}
        setIsEditing={setIsEditingPriority}
        value={data.priority}
        onChange={handlePriorityChange}
      />

      {/* Actions */}
      <TableData className="text-center">
        <div className="flex justify-center space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 
                2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 
                0116.138 21H7.862a2 2 0 01-1.995-1.858L5 
                7m5 4v6m4-6v6m1-10V4a1 1 0 
                00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </TableData>
    </tr>
  );
}

LeaveApproverRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    serial: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    approverName: PropTypes.string.isRequired,
    image: PropTypes.string,
    employeeId: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  updateRecord: PropTypes.func.isRequired,
};
