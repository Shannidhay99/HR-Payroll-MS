import React from "react";

export default function EmployeeNotices() {
  const notices = [
    {
      id: 1,
      title: "Office Holiday - Eid ul-Adha",
      content: "The office will remain closed on August 30-31, 2025 for Eid ul-Adha celebration.",
      date: "2025-08-25",
      priority: "High"
    },
    {
      id: 2,
      title: "Monthly Team Meeting",
      content: "All employees are requested to attend the monthly team meeting on September 1st at 10 AM.",
      date: "2025-08-24",
      priority: "Medium"
    },
    {
      id: 3,
      title: "New Health Insurance Policy",
      content: "We are pleased to announce our new health insurance policy effective from September 1st.",
      date: "2025-08-20",
      priority: "Low"
    }
  ];

  return (
    <section className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-inter">Company Notices</h1>
        <p className="text-gray-600 mt-1">Stay updated with company announcements and news</p>
      </div>

      <div className="space-y-6">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  notice.priority === 'High' ? 'bg-red-100 text-red-800' :
                  notice.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {notice.priority} Priority
                </span>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{notice.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
