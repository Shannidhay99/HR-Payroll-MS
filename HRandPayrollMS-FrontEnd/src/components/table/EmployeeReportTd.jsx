import React from "react";

const EmployeeReportTd = ({ children, className = "" }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
};

export default EmployeeReportTd;
