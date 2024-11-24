import React from "react";

const HistoryCard = ({ createdAt, tag }) => {
  const getRandomRGBColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="flex items-center space-x-5 my-1 p-2 bg-secondary-bg text-white">
      <p className="flex-none font-bold">{createdAt.split("T")[0]}</p>
      <div className="flex flex-wrap">
        {tag.map((t, index) => (
          <p
            key={index}
            className="text-white font-semibold px-2 py-1 mx-0.5 rounded-lg"
            style={{
              backgroundColor: getRandomRGBColor(),
              wordBreak: "break-word", // Prevent long text from breaking the layout
            }}
          >
            {t}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;
