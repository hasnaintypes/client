/**
 * @file protected.route.tsx
 * @summary Route guard for protected (authenticated) pages in TeamSync.
 * @remarks
 * Renders child routes that require authentication.
 */
import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet } from "react-router-dom";
/**
 * ProtectedRoute component renders protected child routes.
 *
 * @returns {JSX.Element} The nested protected routes.
 */

const ProtectedRoute: React.FC = () => {
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
