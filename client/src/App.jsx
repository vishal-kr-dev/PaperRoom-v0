import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
<<<<<<< HEAD
import LoginForm from "./components/Login";
import SignUpForm from "./components/Signup";
=======
import Profile from "./pages/Profile";
>>>>>>> History

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
=======
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />}/>
>>>>>>> History
      </Routes>
    </BrowserRouter>
  );
}

export default App;
