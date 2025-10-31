import PropTypes from "prop-types";
import TableData from "../td/TableData";
import OfficeNoticeTd from "../td/OfficeNoticeTd";
import { useState } from "react";

export default function OfficeNoticeRow({ selectRow, selectedData, data, updateNoticeStatus }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const handleDownload = (attachment) => {
    // Simple download functionality - creates a download link
    const link = document.createElement('a');
    link.href = attachment.image;
    link.download = attachment.filename;
    link.click();
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleStatusChange = (newStatus) => {
    updateNoticeStatus(data.id, newStatus);
    setIsEditingStatus(false);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <tr className="hover:bg-gray-50">
      <TableData className="text-left">
        <OfficeNoticeTd
          data={{
            title: data.title,
            description: data.noticeDescription,
            category: data.category,
            id: data.id,
            visibleCheckbox: true,
          }}
          selectRow={selectRow}
          selectedData={selectedData}
        />
      </TableData>
      <TableData>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(data.priority)}`}>
          {data.priority}
        </span>
      </TableData>
      <TableData>
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">{formatDate(data.date)}</span>
          <span className="text-xs text-gray-500">{data.category}</span>
        </div>
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
            <option value="Archived">Archived</option>
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
        <div className="flex flex-col items-center space-y-2">
          <img
            src={data.attachment.image}
            alt="Notice attachment"
            className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
            onError={(e) => {
              e.target.src = '/images/smarthrlogo.png'; // Fallback image
            }}
          />
          <button
            onClick={() => handleDownload(data.attachment)}
            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download
          </button>
        </div>
      </TableData>
      <TableData>
        <div className="flex items-center gap-3 justify-center">
          <button className="p-2 hover:bg-blue-50 rounded-full transition-colors group">
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-full transition-colors group">
            <img
              src="/icons/fi-sr-trash.svg"
              alt="Delete"
              className="w-4 h-4 group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </TableData>
    </tr>
  );
}

OfficeNoticeRow.propTypes = {
  data: PropTypes.object.isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
  updateNoticeStatus: PropTypes.func.isRequired,
};
