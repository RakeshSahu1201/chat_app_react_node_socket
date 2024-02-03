import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/chat" element={<Chat />} /> {/* 👈 Renders at /app/ */}
        <Route path="/" element={<Login />} /> {/* 👈 Renders at /app/ */}
        <Route path="/home" element={<Home />} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
