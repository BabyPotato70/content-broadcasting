import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Spinner } from "./components/ui";
import { Toaster } from "react-hot-toast";

// Lazy Load Pages
const LoginPage = lazy(() =>
  import("./pages/auth/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const TeacherDashboard = lazy(() =>
  import("./pages/teacher/TeacherDashboard").then((m) => ({
    default: m.TeacherDashboard,
  })),
);
const UploadContent = lazy(() =>
  import("./pages/teacher/UploadContent").then((m) => ({
    default: m.UploadContent,
  })),
);
const MyContent = lazy(() =>
  import("./pages/teacher/MyContent").then((m) => ({ default: m.MyContent })),
);
const PrincipalDashboard = lazy(() =>
  import("./pages/principal/PrincipalDashboard").then((m) => ({
    default: m.PrincipalDashboard,
  })),
);
const PendingApprovals = lazy(() =>
  import("./pages/principal/PendingApprovals").then((m) => ({
    default: m.PendingApprovals,
  })),
);
const AllContent = lazy(() =>
  import("./pages/principal/AllContent").then((m) => ({
    default: m.AllContent,
  })),
);
const LivePage = lazy(() =>
  import("./pages/public/LivePage").then((m) => ({ default: m.LivePage })),
);

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role))
    return <Navigate to="/login" />;
  return children;
};

const RedirectIfAuth = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) {
    return (
      <Navigate
        to={
          user.role === "teacher"
            ? "/teacher/dashboard"
            : "/principal/dashboard"
        }
      />
    );
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/login"
              element={
                <RedirectIfAuth>
                  <LoginPage />
                </RedirectIfAuth>
              }
            />
            <Route path="/live/:teacherId" element={<LivePage />} />

            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="upload" element={<UploadContent />} />
              <Route path="my-content" element={<MyContent />} />
            </Route>

            <Route
              path="/principal"
              element={
                <ProtectedRoute allowedRoles={["principal"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<PrincipalDashboard />} />
              <Route path="pending" element={<PendingApprovals />} />
              <Route path="all-content" element={<AllContent />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
