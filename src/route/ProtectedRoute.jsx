import useLoginStateStore from "@/components/store/useLoginStateStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLogin } = useLoginStateStore();

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
