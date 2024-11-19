import useLoginStateStore from "@/components/store/useLoginStateStore";
import useModalStore from "@/components/store/useModalStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLogin } = useLoginStateStore();
  const { openModal } = useModalStore();

  if (!isLogin) {
    openModal({
      title: "알림",
      desc: "공연을 예매하시려면 로그인을 해주세요.",
    });
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
