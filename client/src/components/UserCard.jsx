import { Link } from "react-router-dom";
import Avatar from "react-avatar"
import profile from "../assets/profile.webp";

const UserCard = (prop) => {
  return (
    <Link to={`/profile/${prop.user}`}>
      <div className="flex flex-col items-center justify-center m-2 bg-primary-bg text-white px-6 py-5 rounded-3xl drop-shadow-2xl hover:scale-105 transition-transform duration-200 relative x-10">
        {/* <img
            className="size-20 rounded-full object-cover overflow-hidden shadow-2xl"
            src={profile}
            alt="Profile picture"
          /> */}
        <Avatar name={prop.user} size="80" round={true} textSizeRatio={2.5} />

        <h1 className="text-xl font-bold text-center">{prop.user}</h1>
      </div>
    </Link>
  );
};

export default UserCard;
