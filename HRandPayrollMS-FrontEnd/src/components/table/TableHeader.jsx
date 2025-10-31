import PropTypes from "prop-types";

export default function TableHeader({
  selectAll = () => false,
  dataSet,
  selectedData = [],
  tableLabels,
}) {
  return (
    <thead>
      <tr className="bg-red-50 dark:bg-dark-theme-primary">
        {tableLabels.map(
          (
            {
              title,
              width,
              checkbox,

              revealOnResponsive,
              floatRight,
              nowrap,
            },
            index
          ) => (
            <th
              key={index}
              className={`p-3 text-gray-900 py-4 text-sm font-medium dark:text-gray-800 leading-none text-center
 ${width ? width : "w-full md:w-auto"} ${
                !revealOnResponsive ? "hidden md:table-cell" : "table-cell"
              }`}
            >
              <span
                className={`inline-flex gap-1 items-center justify-center ${
                  floatRight ? "float-right md:float-none" : ""
                } ${nowrap ? "whitespace-nowrap" : "whitespace-normal"}`}
              >
                {checkbox && (
                  <input
                    type="checkbox"
                    checked={selectedData.length === dataSet}
                    onChange={selectAll}
                    className={`form-checkbox text-gray-900 w-5 h-5 mx-1.5 rounded-md cursor-pointer accent-default-theme`}
                  />
                )}
                {title}
              </span>
            </th>
          )
        )}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  sortDataAsDescending: PropTypes.func,
  selectAll: PropTypes.func,
  dataSet: PropTypes.number,
  selectedData: PropTypes.array,
  fullBorder: PropTypes.bool,
  tableLabels: PropTypes.array.isRequired,
};
