import PropTypes from "prop-types";

export default function RoleTd({ children, className = "" }) {
  return (
    <td className={`px-4 py-3 text-sm text-gray-900 border-b border-gray-200 ${className}`}>
      {children}
    </td>
  );
}

RoleTd.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
