import PropTypes from "prop-types";

export default function SingleNotification({ unread, title, content, time, onDismiss }) {
  const handleDismiss = (e) => {
    e.stopPropagation(); // Prevent triggering the notification click
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className={`flex gap-4 items-center ${unread ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'} select-none cursor-pointer justify-between px-5 py-4 border-b border-gray-100 transition-colors group`}
    >
      <div className="relative">
        <img
          className="min-w-[32px] h-[32px] rounded-full border border-gray-200"
          src="https://mui.com/static/images/avatar/1.jpg"
          alt="profile-picture"
        />
        {unread && (
          <div className="h-2.5 w-2.5 bg-blue-500 rounded-full absolute -top-0.5 -right-0.5 border-2 border-white shadow-sm"></div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-gray-900 text-sm font-semibold leading-tight mb-1">
          {title || "New HR Policy Update"}
        </div>
        <div className="text-gray-600 text-sm leading-tight">
          {content || "New remote work guidelines have been updated. Please review the changes."}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="text-gray-500 text-xs font-medium whitespace-nowrap leading-none">
            {time || "5 min ago"}
          </div>
          {unread && (
            <div className="text-xs text-blue-600 font-medium mt-1">
              New
            </div>
          )}
        </div>
        
        {/* Individual dismiss button */}
        <button
          onClick={handleDismiss}
          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-full transition-all duration-200 flex-shrink-0"
          aria-label="Dismiss notification"
          title="Dismiss notification"
        >
          <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

SingleNotification.propTypes = {
  unread: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
  onDismiss: PropTypes.func,
};
