import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Services from "./pages/Services";
import About from "./pages/About";
import Project from "./pages/Project";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />{" "}
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects/:id" element={<Project />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
