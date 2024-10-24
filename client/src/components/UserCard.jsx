const UserCard = (prop) => {
  return (
    <a href="#" target="_blank">
      <div className="flex flex-col items-center w-36 h-40 bg-slate-100 p-3 rounded-3xl drop-shadow-2xl hover:scale-110 hover:-translate-y-3 transition-transform duration-200">
        <img
          className="size-20 rounded-full object-cover overflow-hidden shadow-2xl"
          src={prop.image}
          alt="Profile picture"
        />
        <h1 className="text-xl font-bold text-center">{prop.name}</h1>
      </div>
    </a>
  );
};

export default UserCard;
