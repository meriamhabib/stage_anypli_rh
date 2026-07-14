import {Routes, Route} from "react-router-dom";

import Login from "../features/auth/components/Login";
import DirecteurDashboard from "../pages/DirecteurDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";


export default function AppRoutes(){

return (

<Routes>

<Route 
path="/login" 
element={<Login/>}
/>


<Route 
path="/directeur" 
element={<DirecteurDashboard/>}
/>


<Route 
path="/employee" 
element={<EmployeeDashboard/>}
/>


</Routes>

);

}