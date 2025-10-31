import PropTypes from "prop-types";

export default function TableData({
  className,
  fullBorder = false,
  ignoreXPadding = false,
  children,
}) {
  return (
    <td
      className={`${fullBorder ? "border" : "border-b"} ${
        ignoreXPadding ? "py-3" : "p-2 xs:p-3"
      } ${className} border-red-50 text-sm dark:text-gray-800 border-r text-center`}
    >
      {children}
    </td>
  );
}

TableData.propTypes = {
  fullBorder: PropTypes.bool,
  ignoreXPadding: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
