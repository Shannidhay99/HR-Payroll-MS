import PropTypes from "prop-types";
import TableData from "../td/TableData";
import AttendanceListTd from "../td/AttendanceListTd";

export default function AttendanceListRow({ selectRow, selectedData, data }) {
  return (
    <tr className="hover:bg-gray-50">
      <TableData className="text-left">
        <AttendanceListTd
          data={data.name}
          selectRow={selectRow}
          selectedData={selectedData}
        />
      </TableData>
      <TableData>
        <span className="text-gray-600 font-medium">{data.employeeId}</span>
      </TableData>
      <TableData>
        <span className="text-green-600 font-medium">{data.checkInTime}</span>
      </TableData>
      <TableData>
        <span className="text-red-600 font-medium">{data.checkOutTime}</span>
      </TableData>
      <TableData>
        <span className={`${data.reasonForLate === "None" ? "text-green-600" : "text-orange-600"} text-sm`}>
          {data.reasonForLate}
        </span>
      </TableData>
      <TableData>
        <span className="text-gray-600">{new Date(data.date).toLocaleDateString('en-GB')}</span>
      </TableData>
      <TableData>
        <span className={`${data.earlyOutReason === "None" ? "text-green-600" : "text-orange-600"} text-sm`}>
          {data.earlyOutReason}
        </span>
      </TableData>
      <TableData>
        <div className="flex items-center gap-3 justify-center">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <img src="/icons/fi-sr-pencil.svg" alt="Edit" className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-full">
            <img
              src="/icons/fi-sr-trash.svg"
              alt="Delete"
              className="w-4 h-4"
            />
          </button>
        </div>
      </TableData>
    </tr>
  );
}

AttendanceListRow.propTypes = {
  data: PropTypes.object.isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
};
