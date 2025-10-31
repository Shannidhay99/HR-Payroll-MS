import PropTypes from "prop-types";

export default function Label({ title, type = "secondary", reverse = false }) {
    const category =
        type === "secondary"
            ? { color: "text-[#2BB2FE]", bg: "bg-[#EAF8FF]", icon: "/icons/arrow-go-back.svg" }
            : type === "primary"
            ? { color: "text-[#027948]", bg: "bg-[#D1FADF]" }
            : type === "ash"
            ? { color: "text-zinc-600", bg: "bg-gray-200", icon: "/icons/time-line.svg" }
            : type === "success"
            ? { color: "text-[#027948]", bg: "bg-[#ECFDF3]", icon: "/icons/check-green.svg" }
            : type === "violet"
            ? { color: "text-white", bg: "bg-[#8B5CF6]" }
            : type === "white"
            ? { color: "text-[#53389E]", bg: "bg-white" }
            : type === "warning"
            ? { color: "text-orange-500", bg: "bg-orange-50", icon: "/icons/alert.svg" }
            : type === "currency"
            ? { color: "text-slate-700", bg: "bg-slate-100", icon: "/icons/Group.svg" }
            : type === "normal"
            ? { color: "text-slate-700", bg: "bg-slate-100" }
            : type === "ultraviolet"
            ? { color: "text-purple-700", bg: "bg-purple-100" }
            : type === "danger"
            ? { color: "text-red-500", bg: "bg-rose-50" }
            : { color: "text-[#B32318]", bg: "bg-[#FEF3F2]", icon: "/icons/close-red.svg" };

    return (
        <div
            className={`${category.bg} inline-flex items-center h-6 px-2.5 py-1 rounded-md justify-start gap-1`}
        >
            <div
                className={`${category.color} text-sm	 font-medium leading-none inline-flex items-center justify-center gap-1`}
            >
                <span
                    className={`whitespace-nowrap select-none font-semibold ${
                        reverse ? "order-1" : "order-3"
                    }`}
                >
                    {title}
                </span>
            </div>
        </div>
    );
}

Label.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    reverse: PropTypes.bool,
    icon: PropTypes.bool,
};
