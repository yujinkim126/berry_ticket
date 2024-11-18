import { Link } from "react-router-dom";
import useLoginStateStore from "./store/useLoginStateStore";
import usePopupStore from "./store/usePopupStore";
import LoginPopup from "./popup/LoginPopup";
import ChargePopup from "./popup/ChargePopup";

const Header = () => {
  const { isLogin, logout } = useLoginStateStore();
  const { openPopup } = usePopupStore();
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="/img/mainLogo.png"
              className="w-[8vw] sm:h-9"
              alt="mainLogoIcon"
            />
          </Link>
          {!isLogin ? (
            <div className="flex items-center lg:order-1">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                onClick={() => openPopup(<LoginPopup />)}
              >
                로그인
              </button>
            </div>
          ) : (
            <div className="flex items-center lg:order-3">
              <Link to="/user/reservation">
                <div className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                  예약현황
                </div>
              </Link>

              <div
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                onClick={() => openPopup(<ChargePopup />)}
              >
                잔액충전
              </div>

              <Link to="/">
                <div
                  className="text-gray-800 bg-gray-200 hover:bg-gray-300
                focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm
                px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  onClick={logout}
                >
                  로그아웃
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
