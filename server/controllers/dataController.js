import HistoryModel from "../models/HistorySchema.js";
import RoomModel from "../models/RoomSchema.js";
import UserModel from "../models/UserSchema.js";

const getLast14Days = () => {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0);
    date.setMinutes(date.getMinutes() + 330);
    days.push(date.toISOString().split("T")[0]);
  }

  return days.reverse();
};

const getAllData = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const room = await RoomModel.findOne({ roomId: user.roomId }).populate({
      path: "users",
      select: "username monthlyPoints",
    });
    if (!room) return res.status(404).json({ msg: "Room not found" });

    const users = room.users;
    if (!users || users.length === 0)
      return res.status(404).json({ msg: "No users found in this room" });

    const last14Days = getLast14Days();

    const data = await aggregateUserActivity(users, last14Days)

    const result = formatUserData(users, last14Days, data, room.goals, room.lastActive);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching room data:", error);
    return res
      .status(500)
      .json({ msg: "Error fetching room data", error: error.message });
  }
};

const aggregateUserActivity = async (users, last14Days) => {
  return HistoryModel.aggregate([
    {
      $match: {
        user: { $in: users.map((user) => user.username) },
        createdAt: { $gte: new Date(last14Days[0]) },
      },
    },
    {
      $project: {
        user: 1,
        day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        tagCount: { $size: "$tag" },
      },
    },
    {
      $addFields: {
        points: { $multiply: ["$tagCount", 1] },
      },
    },
    {
      $group: {
        _id: { user: "$user", day: "$day" },
        totalPoints: { $sum: "$points" },
      },
    },
    { $sort: { "_id.user": 1, "_id.day": 1 } },
  ]);
};

const formatUserData = (users, last14Days, data, goals, lastActive) => {
  const dataMap = data.reduce((map, d) => {
    const key = `${d._id.user}_${d._id.day}`;
    map[key] = d.totalPoints;
    return map;
  }, {});

  const formattedData = {
    dates: last14Days,
    users: users.map((user) => {
      const points = last14Days.map((day) => {
        const key = `${user.username}_${day}`;
        return dataMap[key] || 0;
      });
      return {
        username: user.username,
        points,
        monthlyPoints: user.monthlyPoints,
      };
    }),
    lastActive,
    goals
  };
  return formattedData;
};

export { getAllData };
