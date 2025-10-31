import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import LeaveApproverRow from "../components/table/rows/LeaveApproverRow";
import LeaveTypeRow from "../components/table/rows/LeaveTypeRow";
import HolidayRow from "../components/table/rows/HolidayRow";

export default function LeaveSettings() {
  const [activeTab, setActiveTab] = useState("approvers");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Leave Approvers data
  const [leaveApproversData, setLeaveApproversData] = useState([
    { 
      id: 1, 
      serial: 1, 
      approverName: "Rashedul Islam", 
      employeeId: "EMP-82382", 
      department: "Web Development", 
      priority: 1,
      image: "/images/profile-photo.jpg"
    },
    { 
      id: 2, 
      serial: 2, 
      approverName: "Sadia Afrin", 
      employeeId: "EMP-13445", 
      department: "Human Resource", 
      priority: 2,
      image: "/images/sadia-pic.jpg"
    },
    { 
      id: 3, 
      serial: 3, 
      approverName: "Shahariar Islam", 
      employeeId: "EMP-42452", 
      department: "Sales", 
      priority: 1,
      image: "/images/shahriar-pic.jpg"
    },
    { 
      id: 4, 
      serial: 4, 
      approverName: "Mazaharul Auntu", 
      employeeId: "EMP-24422", 
      department: "Web Development", 
      priority: 3,
      image: "/images/auntu-pic.jpg"
    },
    { 
      id: 5, 
      serial: 5, 
      approverName: "Lina Rahman", 
      employeeId: "EMP-42332", 
      department: "Customer Support", 
      priority: 2,
      image: "/images/lina-pic.jpg"
    },
  ]);

  // Leave Types data
  const [leaveTypesData, setLeaveTypesData] = useState([
    { 
      id: 1, 
      serial: 1, 
      leaveType: { name: "Sick Leave", color: "bg-green-500" }, 
      days: 10 
    },
    { 
      id: 2, 
      serial: 2, 
      leaveType: { name: "Casual Leave", color: "bg-blue-500" }, 
      days: 7 
    },
    { 
      id: 3, 
      serial: 3, 
      leaveType: { name: "Annual Leave", color: "bg-purple-500" }, 
      days: 15 
    },
  ]);

  // Holidays data
  const [holidays] = useState([
    { id: 1, serial: 1, name: "New Year's Day", date: "2025-01-01", type: "National Holiday", status: "Active" },
    { id: 2, serial: 2, name: "International Mother Language Day", date: "2025-02-21", type: "National Holiday", status: "Active" },
    { id: 3, serial: 3, name: "Independence Day", date: "2025-03-26", type: "National Holiday", status: "Active" },
    { id: 4, serial: 4, name: "Eid al-Fitr", date: "2025-04-01", type: "Religious Holiday", status: "Active" },
    { id: 5, serial: 5, name: "Eid al-Fitr (Day 2)", date: "2025-04-02", type: "Religious Holiday", status: "Active" },
    { id: 6, serial: 6, name: "Labour Day", date: "2025-05-01", type: "National Holiday", status: "Active" },
    { id: 7, serial: 7, name: "Buddha Purnima", date: "2025-05-12", type: "Religious Holiday", status: "Active" },
    { id: 8, serial: 8, name: "Eid al-Adha", date: "2025-06-07", type: "Religious Holiday", status: "Active" },
    { id: 9, serial: 9, name: "Eid al-Adha (Day 2)", date: "2025-06-08", type: "Religious Holiday", status: "Active" },
    { id: 10, serial: 10, name: "Eid al-Adha (Day 3)", date: "2025-06-09", type: "Religious Holiday", status: "Active" },
    { id: 11, serial: 11, name: "Muharram", date: "2025-07-06", type: "Religious Holiday", status: "Active" },
    { id: 12, serial: 12, name: "National Mourning Day", date: "2025-08-15", type: "National Holiday", status: "Active" },
    { id: 13, serial: 13, name: "Janmashtami", date: "2025-08-16", type: "Religious Holiday", status: "Active" },
    { id: 14, serial: 14, name: "Durga Puja", date: "2025-10-01", type: "Religious Holiday", status: "Active" },
    { id: 15, serial: 15, name: "Durga Puja (Day 2)", date: "2025-10-02", type: "Religious Holiday", status: "Active" },
    { id: 16, serial: 16, name: "Durga Puja (Day 3)", date: "2025-10-03", type: "Religious Holiday", status: "Active" },
    { id: 17, serial: 17, name: "Durga Puja (Day 4)", date: "2025-10-04", type: "Religious Holiday", status: "Active" },
    { id: 18, serial: 18, name: "Durga Puja (Day 5)", date: "2025-10-05", type: "Religious Holiday", status: "Active" },
    { id: 19, serial: 19, name: "Kali Puja", date: "2025-10-21", type: "Religious Holiday", status: "Active" },
    { id: 20, serial: 20, name: "Diwali", date: "2025-10-23", type: "Religious Holiday", status: "Active" },
    { id: 21, serial: 21, name: "Milad un-Nabi", date: "2025-09-05", type: "Religious Holiday", status: "Active" },
    { id: 22, serial: 22, name: "Victory Day", date: "2025-12-16", type: "National Holiday", status: "Active" },
    { id: 23, serial: 23, name: "Christmas Day", date: "2025-12-25", type: "Religious Holiday", status: "Active" },
  ]);

  // Table headers
  const approversTableLabels = [
    { title: "Serial", sort: false },
    { title: "Approver Name", sort: true },
    { title: "Employee ID", sort: true },
    { title: "Department", sort: true },
    { title: "Priority", sort: true },
    { title: "Action", sort: false },
  ];

  const typesTableLabels = [
    { title: "Serial", sort: false },
    { title: "Leave Type", sort: true },
    { title: "Days", sort: true },
    { title: "Action", sort: false },
  ];

  const holidaysTableLabels = [
    { title: "Serial", sort: false },
    { title: "Holiday Name", sort: true },
    { title: "Date", sort: true },
    { title: "Type", sort: true },
    { title: "Status", sort: true },
    { title: "Action", sort: false },
  ];

  // Update record functions
  const updateApproverRecord = (id, field, value) => {
    setLeaveApproversData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const updateLeaveTypeRecord = (id, field, value) => {
    setLeaveTypesData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Filter approvers by department
  const filteredApprovers =
    selectedDepartment === "all"
      ? leaveApproversData
      : leaveApproversData.filter((approver) => approver.department === selectedDepartment);

  const departments = ["all", ...new Set(leaveApproversData.map((item) => item.department))];

  return (
    <section className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Settings</h1>
          <p className="text-gray-600 mt-2">Manage leave approvers, leave types and holidays</p>
        </div>
        <Link to="/settings">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Back to Settings
          </button>
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("approvers")}
            className={`flex-1 py-4 px-6 ${
              activeTab === "approvers"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-600"
            }`}
          >
            Leave Approvers
          </button>
          <button
            onClick={() => setActiveTab("types")}
            className={`flex-1 py-4 px-6 ${
              activeTab === "types"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-600"
            }`}
          >
            Leave Types
          </button>
          <button
            onClick={() => setActiveTab("holidays")}
            className={`flex-1 py-4 px-6 ${
              activeTab === "holidays"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-600"
            }`}
          >
            Holidays
          </button>
        </div>
      </div>

      {/* Approvers Tab */}
      {activeTab === "approvers" && (
        <div>
          <div className="mb-4">
            <label className="mr-2">Filter by Department: </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <Table 
            tableLabels={approversTableLabels}
            dataSet={filteredApprovers.length}
            selectedData={[]}
            resetSelection={() => {}}
          >
            {filteredApprovers.map((approver) => (
              <LeaveApproverRow key={approver.id} data={approver} updateRecord={updateApproverRecord} />
            ))}
          </Table>
        </div>
      )}

      {/* Leave Types Tab */}
      {activeTab === "types" && (
        <div>
          <Table 
            tableLabels={typesTableLabels}
            dataSet={leaveTypesData.length}
            selectedData={[]}
            resetSelection={() => {}}
          >
            {leaveTypesData.map((leaveType) => (
              <LeaveTypeRow key={leaveType.id} data={leaveType} updateRecord={updateLeaveTypeRecord} />
            ))}
          </Table>
        </div>
      )}

      {/* Holidays Tab */}
      {activeTab === "holidays" && (
        <div>
          <Table 
            tableLabels={holidaysTableLabels}
            dataSet={holidays.length}
            selectedData={[]}
            resetSelection={() => {}}
          >
            {holidays.map((holiday) => (
              <HolidayRow key={holiday.id} data={holiday} />
            ))}
          </Table>
        </div>
      )}
    </section>
  );
}
