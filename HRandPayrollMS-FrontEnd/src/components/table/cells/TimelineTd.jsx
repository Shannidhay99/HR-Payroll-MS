import React from "react";

function TimelineTd({ children, className = "", ...props }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`} {...props}>
      {children}
    </td>
  );
}

export default TimelineTd;
