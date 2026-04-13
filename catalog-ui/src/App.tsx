import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AiDeploymentsPage from "./pages/AiDeployments";
import ArchitecturesPage from "./pages/Architectures";
import ServicesPage from "./pages/Services";
import SolutionsAndUseCasesPage from "./pages/SolutionsAndUseCases";
import { ProtectedRoute } from "@/components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path={ROUTES.AI_DEPLOYMENTS}
              element={<AiDeploymentsPage />}
            />
            <Route
              path={ROUTES.ARCHITECTURES}
              element={<ArchitecturesPage />}
            />
            <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
            <Route
              path={ROUTES.SOLUTIONS_AND_USE_CASES}
              element={<SolutionsAndUseCasesPage />}
            />
          </Route>
        </Route>

        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>

        <Route path={ROUTES.LOGOUT} element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
