import PropTypes from "prop-types";
import TableData from "../td/TableData";
import LeaveTypeTd from "../td/LeaveTypeTd";
import { useState } from "react";

export default function LeaveTypeRow({ data, updateRecord }) {
  const [isEditingDays, setIsEditingDays] = useState(false);

  const handleDaysChange = (newDays) => {
    if (newDays && !isNaN(newDays) && parseInt(newDays) >= 0) {
      updateRecord(data.id, "days", parseInt(newDays));
      setIsEditingDays(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Serial */}
      <TableData className="text-gray-600 font-medium text-center">
        {data.serial}
      </TableData>

      {/* Leave Type with color dot */}
      <TableData className="text-center">
        <div className="flex items-center justify-center">
          <div
            className={`w-3 h-3 rounded-full mr-3 ${data.leaveType.color}`}
          ></div>
          <span className="font-medium text-gray-900">
            {data.leaveType.name}
          </span>
        </div>
      </TableData>

      {/* Editable Days */}
      <LeaveTypeTd
        isEditing={isEditingDays}
        setIsEditing={setIsEditingDays}
        value={data.days}
        onChange={handleDaysChange}
      />

      {/* Action Buttons */}
      <TableData className="text-center">
        <div className="flex justify-center space-x-2">
          <button
            type="button"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 
                   2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
                   a2 2 0 112.828 2.828L11.828 15H9v-2.828
                   l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            type="button"
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
                   0116.138 21H7.862a2 2 0 
                   01-1.995-1.858L5 7m5 4v6m4-6v6m1-10
                   V4a1 1 0 00-1-1h-4a1 1 0 
                   00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </TableData>
    </tr>
  );
}

LeaveTypeRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    serial: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    leaveType: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
    days: PropTypes.number.isRequired,
  }).isRequired,
  updateRecord: PropTypes.func,
};
