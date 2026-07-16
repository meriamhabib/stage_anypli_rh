import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/components/Login";
import DirecteurDashboard from "../pages/DirecteurDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";
import TasksPage from "../features/tasks/pages/TasksPage";


export default function AppRoutes(){

return (

<Routes>

    <Route
        path="/"
        element={<Navigate to="/login" replace />}
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
        path="/employee"
        element={<EmployeeDashboard />}
    />
    <Route path="/tasks" element={<TasksPage />} />
</Routes>




);

}