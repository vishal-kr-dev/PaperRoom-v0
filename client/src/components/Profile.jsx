import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryCard from "./HistoryCard";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const Profile = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;
  const [data, setData] = useState([]);

  const { user } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/history/${user}`);

      setData(response.data.historyEntries);
    } catch (error) {
      console.log(`Error while fetching the data: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-primary-bg">
      {/* History section */}
      <section className="p-2">
        <h1 className="text-2xl font-bold text-center text-white">History</h1>
        <div>
          {data.map((history, index) => (
            <HistoryCard key={index} {...history} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
