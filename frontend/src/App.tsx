// Libs
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import Motd from "./components/pages/Motd";
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
            <Route path="/about" element={<h1>Wip</h1>} />
            <Route path="/motd" element={<Motd />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
