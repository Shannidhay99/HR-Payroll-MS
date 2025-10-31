import PropTypes from "prop-types";
import TogglerIcon from "/images/sun-icon.svg";

const Toggler = ({
  text,
  checked = false,
  handleChange = () => false,
  icon = TogglerIcon,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {icon && <img src={icon} alt="icon" className="w-6 h-6 filter brightness-50" />}
      <input
        onChange={handleChange}
        checked={checked}
        type="checkbox"
        value=""
        className="sr-only peer"
      />

      {text && (
        <span className="ml-2 select-none text-base font-medium text-[#6B6B6B] whitespace-nowrap lg:inline-block hidden">
          {text}
        </span>
      )}
    </label>
  );
};

Toggler.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  icon: PropTypes.string,
};

export default Toggler;
