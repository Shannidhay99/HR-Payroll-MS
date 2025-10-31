import React from "react";
import TimelineTd from "../cells/TimelineTd";

function TimelineRow({ data, index, selectRow, selectedData }) {
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
    <tr className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 border-b border-gray-100">
      {/* Serial Number with Checkbox */}
      <TimelineTd>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded transition-colors"
            checked={selectedData.includes(data.id)}
            onChange={(e) => selectRow(data.id, e)}
          />
          <span className="text-sm font-medium text-gray-700">{index + 1}</span>
        </div>
      </TimelineTd>

      {/* Employee Info */}
      <TimelineTd className="text-left">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              className="h-12 w-12 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
              src={data.employee.image}
              alt={data.employee.name}
              onError={(e) => {
                e.target.src = '/images/profile-photo.jpg';
              }}
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              data.status === 'Present' ? 'bg-green-500' : 
              data.status === 'Late' ? 'bg-yellow-500' :
              data.status === 'Absent' ? 'bg-red-500' : 'bg-blue-500'
            }`}></div>
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-gray-900">{data.employee.name}</div>
            <div className="text-xs text-gray-500">{data.employee.employeeId}</div>
            <div className="text-xs text-gray-400">{data.employee.designation}</div>
          </div>
        </div>
      </TimelineTd>

      {/* Department */}
      <TimelineTd>
        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          {data.department}
        </span>
      </TimelineTd>

      {/* Time In */}
      <TimelineTd>
        <div className="text-sm font-medium text-gray-900">
          {data.timeIn === '--' ? (
            <span className="text-gray-400">--</span>
          ) : (
            <span className="text-green-700 bg-green-50 px-2 py-1 rounded-lg text-xs border border-green-200">
              {data.timeIn}
            </span>
          )}
        </div>
      </TimelineTd>

      {/* Time Out */}
      <TimelineTd>
        <div className="text-sm font-medium text-gray-900">
          {data.timeOut === '--' ? (
            <span className="text-gray-400">--</span>
          ) : (
            <span className="text-red-700 bg-red-50 px-2 py-1 rounded-lg text-xs border border-red-200">
              {data.timeOut}
            </span>
          )}
        </div>
      </TimelineTd>

      {/* Total Hours */}
      <TimelineTd>
        <div className="text-sm font-semibold">
          {data.totalHours === '0h 00m' ? (
            <span className="text-gray-400">0h 00m</span>
          ) : (
            <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded-lg text-xs border border-blue-200">
              {data.totalHours}
            </span>
          )}
        </div>
      </TimelineTd>

      {/* Status */}
      <TimelineTd>
        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(data.status)}`}>
          {getStatusIcon(data.status)}
          {data.status}
        </span>
      </TimelineTd>

      {/* Location */}
      <TimelineTd>
        <div className="text-sm text-gray-600">
          {data.location === 'N/A' ? (
            <span className="text-gray-400 italic">N/A</span>
          ) : (
            <span className="text-gray-700">
              {data.location}
            </span>
          )}
        </div>
      </TimelineTd>

      {/* Actions */}
      <TimelineTd>
        <div className="flex items-center justify-center space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 border border-transparent hover:border-blue-200" title="View Details">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110 border border-transparent hover:border-green-200" title="Edit Entry">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 hover:scale-110 border border-transparent hover:border-purple-200" title="Export Record">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110 border border-transparent hover:border-red-200" title="Delete Entry">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </TimelineTd>
    </tr>
  );
}

export default TimelineRow;
