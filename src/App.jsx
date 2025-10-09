import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import About from "./page/About";
import Journal from "./page/Journal";
import Contact from "./page/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
