import React, { useState } from "react";
import { PanelRightClose, PanelRightOpen, User, Target } from "lucide-react";
import Profile from "./Profile";
import Goals from "./Goals";
import Navbar from "./Navbar";

const Sidebar = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTabState] = useState("profile"); // Default to "profile"

  const handleTabClick = (tab) => {
    setActiveTabState(tab);
    if (setActiveTab) setActiveTab(tab);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <Navbar />
      <div className="flex h-screen fixed bg-secondary-bg text-white border-r">
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:block md:w-64  transition-transform duration-500  border-r border-gray-300`}
        >
          <div className="flex items-center justify-between py-1 px-2 pr-6 my-3 md:pl-5 md:pb-2 text-2xl font-semibold border-b border-gray-300">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-3 hover:bg-hover rounded-lg"
            >
              <PanelRightOpen size={24} />
            </button>
            <p>Dashboard</p>
          </div>
          <ul>
            <li
              onClick={() => handleTabClick("profile")}
              className={`px-4 py-3 m-2 flex items-center cursor-pointer rounded-lg ${
                activeTab === "profile" ? "bg-hover" : "hover:bg-hover"
              }`}
            >
              <User className="mr-3" /> Profile
            </li>
            <li
              onClick={() => handleTabClick("goals")}
              className={`px-4 py-3 m-2 flex items-center cursor-pointer rounded-lg ${
                activeTab === "goals" ? "bg-hover" : "hover:bg-hover"
              }`}
            >
              <Target className="mr-3" /> Goals
            </li>
          </ul>
        </div>

        {/* Mobile Collapsed View */}
        <div
          className={`${
            !isOpen ? "flex flex-col items-center w-16" : "hidden"
          } md:hidden `}
        >
          <div className="border-b border-gray-300">
            <button
              onClick={toggleSidebar}
              className="m-3 mt-4 my-1 p-3 hover:bg-hover rounded-lg "
            >
              <PanelRightClose size={24} />
            </button>
          </div>
          <button
            onClick={() => handleTabClick("profile")}
            className={`p-3 mt-3 mb-2 rounded-lg ${
              activeTab === "profile" ? "bg-hover" : "hover:bg-hover"
            }`}
          >
            <User size={24} />
          </button>
          <button
            onClick={() => handleTabClick("goals")}
            className={`p-3 rounded-lg ${
              activeTab === "goals" ? "bg-hover" : "hover:bg-hover"
            }`}
          >
            <Target size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-64">
        {activeTab === "profile" && <Profile />}
        {activeTab === "goals" && <Goals />}
      </div>
    </main>
  );
};

export default Sidebar;
