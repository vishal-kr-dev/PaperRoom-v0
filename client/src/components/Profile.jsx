import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import HistoryCard from "./HistoryCard";
import dummy from "../assets/profile.webp";
import useDataStore from "../zustandStore/dataStore";

const Profile = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;
  const [data, setData] = useState([]);

  const { user } = useParams();
  const { roomId } = useDataStore((state) => state.user);

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
      {/* Profile section */}
      <section className="flex items-center justify-center text-white font-semibold text-2xl">
        <div>
          <div className="p-2">
            <img src={dummy} alt="" className="size-48 border rounded-full" />
          </div>
          <div className="p-2">
            <p>Username: {user}</p>
            <p>RoomId: {roomId}</p>
            {/* <p>Socials</p> */}
          </div>
        </div>
      </section>

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
