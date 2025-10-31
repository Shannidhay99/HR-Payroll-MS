import PropTypes from "prop-types";

export default function OfficeNoticeTd({
  data,
  selectRow = () => false,
  selectedData,
}) {
  return (
    <div className="flex items-start gap-3 justify-start py-2">
      {data.visibleCheckbox && (
        <input
          type="checkbox"
          onChange={(e) => selectRow(data.id, e)}
          checked={Boolean(selectedData.find((id) => data.id === id))}
          className="form-checkbox cursor-pointer accent-red-600 w-5 h-5 mt-1 rounded-md flex-shrink-0"
        />
      )}

      <div className="flex-1 max-w-sm">
        <div className="mb-2">
          <h3 className="text-gray-900 font-semibold text-sm mb-1 line-clamp-2">
            {data?.title}
          </h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            data?.category === 'General' ? 'bg-blue-100 text-blue-800' :
            data?.category === 'Holiday' ? 'bg-green-100 text-green-800' :
            data?.category === 'Meeting' ? 'bg-purple-100 text-purple-800' :
            data?.category === 'Event' ? 'bg-yellow-100 text-yellow-800' :
            data?.category === 'Security' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {data?.category}
          </span>
        </div>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
          {data?.description}
        </p>
      </div>
    </div>
  );
}

OfficeNoticeTd.propTypes = {
  data: PropTypes.object.isRequired,
  selectRow: PropTypes.func,
  selectedData: PropTypes.array,
};
