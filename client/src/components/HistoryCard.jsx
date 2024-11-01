import React from "react";

const HistoryCard = ({ tag, description, duration }) => {
  return (
      <div className="flex items-center justify-between space-x-5 mx-4 my-1 p-2 border border-black">
        <p className="font-semibold">{tag}</p>
        <p className="truncate ">{description}</p>
        <p>{duration}</p>
      </div>
  );
};

export default HistoryCard;
