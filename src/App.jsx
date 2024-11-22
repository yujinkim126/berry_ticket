import { Outlet } from "react-router-dom";
import Header from "@Components/Header";
import GlobalModal from "./Components/common/GlobalModal";
import GlobalPopup from "./Components/common/GlobalPopup";

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
