import PropTypes from "prop-types";

export default function CustomButton({
    text = "Click",
    width = "w-auto",
    color = "text-slate-700",
    bg = "bg-white",
    height = "h-auto",
    fontSize = "font-normal",
    icon, // New prop for the icon
    startIcon = true, // New prop to control icon position
    rounded = "", // Changed to an empty string to indicate no default value
}) {
    // Use the rounded prop directly to determine the border-radius class
    const borderRadiusClass = rounded ? rounded : "rounded-none";

    return (
        <button
            className={`${bg} ${color} ${width} ${height} flex items-center justify-center ${borderRadiusClass} border border-gray-300 px-[14px] whitespace-nowrap transition-all active:scale-95`}
        >
            {startIcon && icon && (
                <img
                    src={icon}
                    className="mr-2" // Add margin to the right of the icon
                    alt="Button icon"
                />
            )}
            <span className={`font-public-sans ${fontSize} text-inherit text-center`}>{text}</span>
            {!startIcon && icon && (
                <img
                    src={icon}
                    className="ml-2" // Add margin to the left of the icon
                    alt="Button icon"
                />
            )}
        </button>
    );
}

CustomButton.propTypes = {
    text: PropTypes.string,
    width: PropTypes.string,
    color: PropTypes.string,
    bg: PropTypes.string,
    fontSize: PropTypes.string,
    height: PropTypes.string,
    icon: PropTypes.string, // Prop for the icon
    startIcon: PropTypes.bool, // Prop to control icon position
    rounded: PropTypes.string, // Updated to PropTypes.string to reflect the change
};
