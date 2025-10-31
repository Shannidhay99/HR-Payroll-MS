import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import Overview from "../pages/OverviewPage";
import LandingPage from "../pages/LandingPage";
import Profile from "../pages/profile";

// Layouts
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";

// Pages
import Login from "../pages/Login/Login";
import GoogleCallback from "../pages/Login/GoogleCallback";
import Registration from "../pages/Registration/Registration";
import Dashboard from "../pages/Dashboard";
import Company from "../pages/Company/Company";
import Allemployee from "../pages/AllEmployee";
import LeaveApplication from "../pages/LeaveApplication";
import AttendanceList from "../pages/AttendanceList";
import OfficeNotice from "../pages/OfficeNotice";
import ExpenseList from "../pages/expense/ExpenseList";
import TimeAttendanceSettings from "../pages/TimeAttendanceSettings";
import Settings from "../pages/Settings";
import LeaveSettings from "../pages/LeaveSettings";
import EmployeeSettings from "../pages/EmployeeSettings";
import Salary from "../pages/Salary";
import Payroll from "../pages/Payroll";
import Increment from "../pages/Increment";
import Timeline from "../pages/Timeline";
import EmployeeReport from "../pages/EmployeeReport";
import AttendanceReport from "../pages/AttendanceReport";
import LeaveReport from "../pages/LeaveReport";
import PayrollReport from "../pages/PayrollReport";
import ExpenseReports from "../pages/ExpenseReports";
import Reports from "../pages/Reports";

// Employee Portal Pages
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmployeeProfile from "../pages/employee/EmployeeProfile";
import EmployeePayslips from "../pages/employee/EmployeePayslips";
import EmployeeAttendance from "../pages/employee/EmployeeAttendance";
import EmployeeLeaveRequests from "../pages/employee/EmployeeLeaveRequests";
import EmployeeNotices from "../pages/employee/EmployeeNotices";

export default function Routers() {
  return (
    <Routes>
      {/* Landing page without layout */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes */}
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      {/* Main layout routes */}
      <Route element={<MainLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="overview" element={<Overview />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="company" element={<Company />} />
        <Route path="employee">
          <Route index element={<Allemployee />} />
        </Route>
        <Route path="leave">
          <Route index element={<LeaveApplication />} />
        </Route>
        <Route path="attendance">
          <Route index element={<AttendanceList />} />
        </Route>
        <Route path="timeline">
          <Route index element={<Timeline />} />
        </Route>
        <Route path="notice">
          <Route index element={<OfficeNotice />} />
        </Route>
        <Route path="expense">
          <Route index element={<ExpenseList />} />
        </Route>
        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path="time-attendance" element={<TimeAttendanceSettings />} />
          <Route path="leave-settings" element={<LeaveSettings />} />
          <Route path="employee-settings" element={<EmployeeSettings />} />
        </Route>
        <Route path="payroll">
          <Route index element={<Payroll />} />
          <Route path="salary-settings" element={<Salary />} />
          <Route path="increment" element={<Increment />} />
        </Route>
        <Route path="reports">
          <Route index element={<Reports />} />
          <Route path="employee-reports" element={<EmployeeReport />} />
          <Route path="attendance-reports" element={<AttendanceReport />} />
          <Route path="leave-reports" element={<LeaveReport />} />
          <Route path="payroll-reports" element={<PayrollReport />} />
          <Route path="expense-reports" element={<ExpenseReports />} />
        </Route>
      </Route>

      {/* Employee Portal Routes */}
      <Route path="employee">
        <Route element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="payslips" element={<EmployeePayslips />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="leave-requests" element={<EmployeeLeaveRequests />} />
          <Route path="notices" element={<EmployeeNotices />} />
        </Route>
      </Route>

      {/* Employee Dashboard Redirect for backwards compatibility */}
      <Route path="/employee-dashboard" element={<Navigate to="/employee/dashboard" replace />} />

      {/* Blank layout routes */}
      <Route element={<BlankLayout />}>
        <Route path="signup" element={<Registration />} />
        <Route path="signin" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
