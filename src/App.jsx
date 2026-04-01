import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RegistroNuevaJornada from "./pages/RegistroNuevaJornada";
import RegistroJornada from "./pages/RegistroJornada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/RegistroNuevaJornada" element={<RegistroNuevaJornada />} />
        <Route path="RegistroJornada" element={<RegistroJornada />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;