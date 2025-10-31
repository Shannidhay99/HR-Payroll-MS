import React from 'react';
import AttendanceTypeTd from "../td/AttendanceTypeTd";

export default function AttendanceTypeRow({ data }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      <AttendanceTypeTd field="typeName" value={data.typeName} />
      <AttendanceTypeTd field="location" value={data.location} />
      <AttendanceTypeTd field="status" value={data.status} />
      <AttendanceTypeTd field="action" value="actions" />
    </tr>
  );
}
