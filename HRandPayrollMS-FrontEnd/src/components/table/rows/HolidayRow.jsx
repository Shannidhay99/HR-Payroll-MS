import React from "react";
import TableData from "../td/TableData";

export default function HolidayRow({ data }) {
  return (
    <tr className="hover:bg-gray-50">
      <TableData>{data.serial}</TableData>
      <TableData>{data.name}</TableData>
      <TableData>{data.date}</TableData>
      <TableData>{data.type}</TableData>
      <TableData>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          data.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {data.status}
        </span>
      </TableData>
      <TableData>
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit"
            onClick={() => {
              // Handle edit functionality
              console.log('Edit holiday:', data.id);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Delete"
            onClick={() => {
              // Handle delete functionality
              console.log('Delete holiday:', data.id);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </TableData>
    </tr>
  );
}
