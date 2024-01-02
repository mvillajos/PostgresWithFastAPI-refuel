import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RefuelForm from "./pages/RefuelForm";
import NavBar from "./components/NavBar";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-10">
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/refuelop/:id" element={<RefuelForm />}></Route>
          <Route path="/refuelop" element={<RefuelForm />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
