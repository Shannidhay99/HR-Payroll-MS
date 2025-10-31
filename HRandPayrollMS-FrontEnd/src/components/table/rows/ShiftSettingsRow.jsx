import React from 'react';
import ShiftSettingsTd from "../td/ShiftSettingsTd";

export default function ShiftSettingsRow({ data }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      <ShiftSettingsTd field="shiftName" value={data.shiftName} />
      <ShiftSettingsTd field="shiftType" value={data.shiftType} />
      <ShiftSettingsTd field="checkInTime" value={data.checkInTime} />
      <ShiftSettingsTd field="checkOutTime" value={data.checkOutTime} />
      <ShiftSettingsTd field="graceTime" value={data.graceTime} />
      <ShiftSettingsTd field="workingDays" value={data.workingDays} />
      <ShiftSettingsTd field="weekends" value={data.weekends} />
      <ShiftSettingsTd field="status" value={data.status} />
      <ShiftSettingsTd field="action" value="actions" />
    </tr>
  );
}
