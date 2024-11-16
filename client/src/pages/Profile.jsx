import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryCard from "../components/HistoryCard";

const Profile = () => {
  const baseURL = import.meta.env.VITE_BACK_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/history/Demo`);
        console.log(response.data.historyEntries);

        setData(response.data.historyEntries);
      } catch (error) {
        console.log(`Error while fetching the data: ${error}`);
      }
    };
    fetchData();
  }, []);

  const userHistory = [
    {
      id: "1",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, ullam consequuntur. Cum sunt incidunt fugit alias temporibus assumenda quisquam suscipit distinctio, placeat dolore.",
      tag: "DSA",
      duration: "04:04",
    },
    {
      id: "2",
      description: "",
      tag: "DSA",
      duration: "04:04",
    },
  ];

  return (
    <>

      {/* History section */}
      <section>
        <h1 className="text-2xl font-bold text-center">History</h1>
        <div>
          {data.map((history, index) => (
            <HistoryCard key={index} {...history} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
