import React from "react";

const HistoryCard = ({ tag, description, createdAt }) => {
  return (
    <div className="flex items-center justify-between space-x-5 mx-4 my-1 p-2 border border-black">
      <p>{createdAt.split("T")[0]}</p>
      <p className="truncate ">{description}</p>
      <p className="font-semibold">{tag}</p>
    </div>
  );
};

export default HistoryCard;
