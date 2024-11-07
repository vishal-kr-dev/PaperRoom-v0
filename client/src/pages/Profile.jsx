import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryCard from "../components/HistoryCard";

const Profile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/history");
        console.table(response);

        setData(response.data);
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
          {userHistory.map((history) => (
            <HistoryCard key={history.id} {...history} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
