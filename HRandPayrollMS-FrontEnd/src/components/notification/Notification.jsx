import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import SingleNotification from "./SingleNotification";
import { useState } from "react";

export default function Notification({ closeNotificationPopup }) {
  // Sample notification data with state management
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New HR Policy Update", content: "Remote work guidelines updated", time: "2 min ago", unread: true },
    { id: 2, title: "Payroll Processing", content: "Monthly payroll has been completed", time: "1 hour ago", unread: true },
    { id: 3, title: "Leave Request Approved", content: "Your vacation leave has been approved", time: "3 hours ago", unread: false },
    { id: 4, title: "Team Meeting Reminder", content: "Daily standup in 15 minutes", time: "1 day ago", unread: false },
    { id: 5, title: "System Maintenance", content: "Scheduled maintenance tonight", time: "2 days ago", unread: false },
  ]);

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <OutsideClickHandler onOutsideClick={closeNotificationPopup}>
      <div className="fixed top-16 right-3 sm:right-20 w-[330px] sm:w-[440px] h-[506px] bg-white border border-gray-200 rounded-2xl shadow-xl z-30">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
          <div className="text-gray-900 text-xl font-semibold leading-normal">
            Notifications {unreadCount > 0 && <span className="text-sm font-medium text-blue-600">({unreadCount})</span>}
          </div>
          <div className="flex items-center space-x-2">
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                title="Clear all notifications"
              >
                Clear all
              </button>
            )}
            <button 
              className="cursor-pointer p-1 hover:bg-gray-200 rounded-full transition-colors"
              onClick={closeNotificationPopup}
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-[390px] overflow-y-auto bg-white">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <SingleNotification
                key={notification.id}
                unread={notification.unread}
                title={notification.title}
                content={notification.content}
                time={notification.time}
                onDismiss={() => handleDismissNotification(notification.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-sm font-medium">No notifications</p>
                <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
              </div>
            </div>
          )}
        </div>
        
        {unreadCount > 0 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <input
                className="accent-red-600 cursor-pointer"
                type="checkbox"
                name="mark-all"
                id="mark-all"
                onChange={handleMarkAllAsRead}
              />
              <label
                htmlFor="mark-all"
                className="text-gray-700 select-none text-sm cursor-pointer font-medium leading-[18px]"
              >
                Mark all as read
              </label>
            </div>
            <span className="text-xs text-gray-500">
              {unreadCount} unread
            </span>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

Notification.propTypes = {
  closeNotificationPopup: PropTypes.func,
};
