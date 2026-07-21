import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/components/Login";
import DirecteurDashboard from "../pages/DirecteurDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";
import TasksPage from "../features/tasks/pages/TasksPage";
import LandingPage from "../pages/LandingPage";
import LeaveRequestsPage from "../features/leaveRequests/pages/LeaveRequestsPage";
import DocumentsPage from "../features/documents/pages/DocumentsPage";
import EmployeesPage from "../features/employees/pages/EmployeesPage";

export default function AppRoutes(){

return (

<Routes>

    <Route
        path="/"
        element={<LandingPage />}
    />

    <Route
        path="/login"
        element={<Login />}
    />

    <Route
        path="/forgot-password"
        element={<ForgotPassword />}
    />

    <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
    />

    <Route
        path="/directeur"
        element={<DirecteurDashboard />}
    />
    <Route
    path="/leave-requests"
    element={<LeaveRequestsPage />}
/>
<Route path="/documents" element={<DocumentsPage />} />
<Route path="/employees" element={<EmployeesPage />} />

    <Route
        path="/employee"
        element={<EmployeeDashboard />}
    />
    <Route path="/tasks" element={<TasksPage />} />
</Routes>



);

}