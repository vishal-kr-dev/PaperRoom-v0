import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import useAuthStore from "../zustandStore/authStore";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import LogForm from "../components/LogForm";
import { Plus } from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const users = [
    {
      name: "Unknown",
      id: 1,
      image: "https://placehold.co/600x400/000000/FFFFFF.png",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 h-16  shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-tight">PaperRoom</h1>

        {/* + button */}
        <div className="flex-1 flex justify-center">
          <button
            className="flex items-center justify-center w-32 h-12 border-2 border-white text-2xl font-bold  hover:text-green-500 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Profile Button */}
          <button className="text-lg px-4 py-2 text-black border-2 border-black hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
            Profile
          </button>
        </div>
      </nav>

      {/* Modal for Login Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LogForm setIsModalOpen={setIsModalOpen} />
      </Modal>

      {/* Main Content Area */}
      <section className="flex flex-col lg:flex-row gap-4 p-6">
        {/* Left Section (Graphs, Content, etc.) */}
        <section className="lg:w-3/4 bg-white shadow-lg rounded-lg p-6 flex-grow">
          {/* Placeholder for future graphs/content */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Analytics Overview
          </h2>
          {/* Add your graph component here */}
        </section>

        {/* Right Section (Sidebar for additional content) */}
        <section className="lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sidebar</h2>
          {/* Sidebar content */}
        </section>
      </section>

      {/* User Cards Section */}
      <section className="flex w-full gap-4 p-4 overflow-x-auto bg-blue-50 shadow-inner rounded-lg">
        {users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </section>
    </main>
  );
};

export default Home;
