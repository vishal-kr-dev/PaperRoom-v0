import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import useAuthStore from "../zustandStore/authStore";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import LogForm from "../components/LogForm";
import { Plus } from "lucide-react";
import axios from "axios";
import LineGraph from "../components/LineGraph";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseURL = import.meta.env.VITE_BACK_URL;

  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/home/`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
        },
      });
      // console.log("Response data:", response.data)
      setData(response.data);
    } catch (error) {
      console.log(`Error at Home.jsx: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      fetchData();
    } else {
      navigate("/login");
    }
  }, [isModalOpen]);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between px-8 h-16  shadow-lg">
            <img src="logo.png" className="w-56" alt="PAPER ROOM" />

            {/* + button */}
            <button
              className="flex items-center justify-center w-32 h-12 border-2 border-white text-2xl font-bold  hover:text-green-500 transition duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus />
            </button>

            {/* Profile Button */}
            <Link to={"/user/demo"}>
              <button className="text-lg px-3 py-1 rounded-lg text-black border-2 border-black font-semibold hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                Profile
              </button>
            </Link>
          </nav>

          {/* Modal for Login Form */}
          <ToastContainer />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <LogForm setIsModalOpen={setIsModalOpen} />
          </Modal>

          {/* Main Content Area */}
          <section className="flex flex-col lg:flex-row gap-4 p-6">
            {/* Left Section (Graphs, Content, etc.) */}
            <section className="lg:w-3/4 bg-white shadow-lg rounded-lg p-6 flex-grow">
              {/* Placeholder for future graphs/content */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                <LineGraph data={data} />
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
            {data.users.map((user, index) => {
              return <UserCard key={index} user={user.user} />;
            })}
          </section>
        </>
      )}
    </main>
  );
};

export default Home;
