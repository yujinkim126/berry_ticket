import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Seat from "./Components/reservation/Seat";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Seat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
