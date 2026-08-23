import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import CrewPage from "./pages/crew";
import DestinationPage from "./pages/destination";
import TechPage from "./pages/tech";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/technology" element={<TechPage />} />
        <Route path="/crew" element={<CrewPage />} />
        <Route path="/destination" element={<DestinationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;