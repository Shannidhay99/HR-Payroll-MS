import PropTypes from "prop-types";

export default function ExpenseReportsTd({
  data,
  selectRow = () => false,
  selectedData,
}) {
  return (
    <div className="flex items-center gap-2 justify-start">
      {data.visibleCheckbox && (
        <input
          type="checkbox"
          onChange={(e) => selectRow(data.id, e)}
          checked={Boolean(selectedData.find((id) => data.id === id))}
          className="form-checkbox cursor-pointer accent-default-theme w-5 h-5 mx-3 rounded-md"
        />
      )}

      <img
        src={data?.image}
        alt={data?.title}
        className="w-11 h-11 rounded-lg"
      />
      <span className="text-neutral-800 text-sm font-medium">
        {data?.title}
      </span>
    </div>
  );
}

ExpenseReportsTd.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    visibleCheckbox: PropTypes.bool,
  }).isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array.isRequired,
};
