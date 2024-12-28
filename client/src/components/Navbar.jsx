import React, { useState } from "react";
import { Plus, CircleUserRound, Home, LogOut } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Modal from "../components/Modal";
import LogForm from "../components/LogForm";
import logo from "../assets/logo.png";
import useUserDataStore from "../Store/dataStore";
import useAuthStore from "../Store/authStore";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useUserDataStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  const {setIsAuthenticated} = useAuthStore()

  const logOut = () => {
    localStorage.removeItem("jwtToken")
    setIsAuthenticated(false)
    navigate("/")
  }

  return (
    <nav className="bg-primary-bg sticky top-0 z-10">
      {isAuthRoute ? (
        <div className="flex items-center justify-between px-8 h-16  shadow-lg border-b border-hover">
          <img src={logo} className="w-56" alt="PAPER ROOM" />
        </div>
      ) : (
        <div className="flex items-center justify-between px-3 h-16  shadow-lg border-b border-hover">
          <img src={logo} className="w-56" alt="PAPER ROOM" />

          {/* + button */}
          {location.pathname === "/" && (
            <button
              className="flex items-center justify-center w-32 h-12 border-2 border-white rounded-lg text-white text-2xl font-bold  hover:text-green-500 transition duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus />
            </button>
          )}

          <div className="flex gap-2">
            {/* Profile Button */}
            {location.pathname === "/" ? (
              <button
                className="flex items-center justify-center gap-1 w-24 h-10 text-lg rounded-lg text-white border-2 font-semibold bg-accent hover:text-accent hover:bg-white hover:border-accent hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(`/user/${username}`)}
              >
                <CircleUserRound />
                Profile
              </button>
            ) : (
              <button
                className="flex items-center justify-center gap-1 w-24 h-10 text-lg rounded-lg text-white border-2 font-semibold bg-accent hover:text-accent hover:bg-white hover:border-accent hover:scale-105 transition-transform duration-200"
                onClick={() => navigate("/")}
              >
                <Home />
                Home
              </button>
            )}
            <button className="flex items-center justify-center gap-1 w-24 h-10 text-lg rounded-lg text-white bg-red-600 border-2 font-semibold hover:text-red-600 hover:bg-white hover:border-red-600 hover:scale-105 transition-transform duration-200" onClick={() => logOut()}>
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Modal for Login Form */}
      <ToastContainer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LogForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </nav>
  );
};

export default Navbar;
