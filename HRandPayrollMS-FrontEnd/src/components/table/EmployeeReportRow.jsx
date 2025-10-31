import React from "react";
import TableData from "./td/TableData";

const EmployeeReportRow = ({ employee }) => {
  const handleView = (id) => {
    console.log("View employee:", id);
    // Add view logic here
  };

  const handleEdit = (id) => {
    console.log("Edit employee:", id);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete employee:", id);
    // Add delete logic here
  };

  return (
    <tr className="hover:bg-gray-50">
      {/* Employee Info */}
      <TableData>
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={employee.avatar}
            alt={employee.name}
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500">{employee.employeeId}</div>
            <div className="text-sm text-gray-500">{employee.email}</div>
          </div>
        </div>
      </TableData>

      {/* Department */}
      <TableData>
        <div className="text-sm text-gray-900">{employee.department}</div>
      </TableData>

      {/* Position */}
      <TableData>
        <div className="text-sm text-gray-900">{employee.position}</div>
      </TableData>

      {/* Status */}
      <TableData>
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            employee.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {employee.status}
        </span>
      </TableData>

      {/* Hire Date */}
      <TableData>
        <div className="text-sm text-gray-900">
          {new Date(employee.hireDate).toLocaleDateString("en-GB")}
        </div>
      </TableData>

      {/* Salary */}
      <TableData>
        <div className="text-sm font-medium text-gray-900">{employee.salary}</div>
      </TableData>

      {/* Location */}
      <TableData>
        <div className="text-sm text-gray-900">{employee.location}</div>
      </TableData>

      {/* Actions */}
      <TableData>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(employee.id)}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            title="View Details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={() => handleEdit(employee.id)}
            className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
            title="Edit Employee"
          >
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(employee.id)}
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
            title="Delete Employee"
          >
            <img src="/icons/fi-sr-trash.svg" alt="Delete" className="w-4 h-4" />
          </button>
        </div>
      </TableData>
    </tr>
  );
};

export default EmployeeReportRow;
