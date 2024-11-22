import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import GlobalModal from "./components/common/GlobalModal";
import GlobalPopup from "./components/common/GlobalPopup";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <GlobalModal />
      <GlobalPopup />
    </div>
  );
}

export default App;
