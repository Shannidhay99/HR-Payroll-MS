import PropTypes from "prop-types";
import SalarySettingsTd from "../td/SalarySettingsTd";

export default function SalarySettingsRow({ data, index }) {
  return (
    <tr className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <SalarySettingsTd className="text-center font-medium">
        {index + 1}
      </SalarySettingsTd>
      
      <SalarySettingsTd className="text-center">
        <p className="font-medium text-gray-900">{data.name}</p>
      </SalarySettingsTd>
      
      <SalarySettingsTd className="text-center">
        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
          {data.percentage}%
        </span>
      </SalarySettingsTd>
      
      <SalarySettingsTd className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            type="button"
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
            title="Edit"
          >
            <img 
              src="/icons/fi-sr-pencil.svg" 
              alt="Edit" 
              className="w-4 h-4"
            />
          </button>
          <button
            type="button"
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
            title="Delete"
          >
            <img 
              src="/icons/fi-sr-trash.svg" 
              alt="Delete" 
              className="w-4 h-4"
            />
          </button>
        </div>
      </SalarySettingsTd>
    </tr>
  );
}

SalarySettingsRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
