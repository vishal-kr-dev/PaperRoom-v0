import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import useAuthStore from "../zustandStore/authStore";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import LogForm from "../components/LogForm";

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
  }, []);

  const users = [
    {
      name: "Unknown",
      id: 1,
      image: "https://placehold.co/600x400/000000/FFFFFF.png",
    },
  ];

  return (
    <main className="flex flex-col h-screen">
      <nav className="flex items-center justify-between px-8 h-16 border-4 border-green-500">
        <h1 className="text-3xl font-bold">PaperRoom</h1>
        <button
          className="flex items-center justify-center border-2 rounded-lg border-black px-20 lg:px-32 py-2 text-1xl font-bold"
          onClick={() => setIsModalOpen(true)}
        >
          (+)
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <LogForm setIsModalOpen={setIsModalOpen} />
        </Modal>

        <button className="text-lg px-3 py-1 text-black border-2 border-black hover:bg-gray-100 hover:scale-110 transition-transform duration-200">
          Profile
        </button>
      </nav>

      <section className="flex flex-col lg:flex-row flex-grow">
        <section className="lg:w-3/4 border-4 border-yellow-500 flex-grow">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          exercitationem atque eius, nesciunt saepe temporibus itaque, amet quae
          officiis error totam aut qui nostrum aliquam quam expedita. Enim
          architecto quibusdam vero dicta laudantium, sint aliquam unde
          incidunt, veritatis repellendus qui voluptates vel ad.
        </section>
        <section className="lg:w-1/4 border-4 border-red-700 flex-grow">
          <div className="size-32"></div>
        </section>
      </section>

      <section
        className="flex w-full gap-3 p-3 shadow-inner border-4 border-blue-600 overflow-x-scroll"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {users.map((item) => {
          return <UserCard key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
};

export default Home;
