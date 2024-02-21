import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MyChat from "./pages/chat/MyChat";
import Auth from "./pages/auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/test-chat" element={<Chat />} />{" "}
        {/* 👈 Renders at /app/ */}
        <Route path="/login" element={<Login />} /> {/* 👈 Renders at /app/ */}
        <Route path="/home" element={<Home />} /> {/* 👈 Renders at /app/ */}
        <Route path="/chat" element={<MyChat />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
