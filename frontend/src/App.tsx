// Libs
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import Motd from "./components/pages/Motd";
import CustomSay from "./components/pages/customSay";

// Layouts
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/container";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to={"/motd"} replace />} />
            <Route path="/motd" element={<Motd />} />
            <Route path="/custom" element={<CustomSay />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
