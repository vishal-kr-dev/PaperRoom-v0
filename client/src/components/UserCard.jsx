import { Link } from "react-router-dom";
import profile from "../assets/profile.webp";

const UserCard = (prop) => {
  return (
    
    <Link to={`/profile/${prop.user}`}>
        <div className="flex flex-col items-center justify-center w-36 h-40 bg-primary-bg text-white p-3 rounded-3xl drop-shadow-2xl hover:scale-110 hover:-translate-y-3 transition-transform duration-200">
          <img
            className="size-20 rounded-full object-cover overflow-hidden shadow-2xl"
            src={profile}
            alt="Profile picture"
          />
          <h1 className="text-xl font-bold text-center">{prop.user}</h1>
        </div>
    </Link>
  );
};

export default UserCard;
