import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/Login";
import SignUpForm from "./components/Signup";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/user/:user" element={<Sidebar />} />
        <Route path="/profile/:user" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
