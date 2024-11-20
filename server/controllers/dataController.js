import HistoryModel from "../models/HistorySchema.js";
import RoomModel from "../models/RoomSchema.js";
import UserModel from "../models/UserSchema.js";

// Utility function to generate the last 14 days in YYYY-MM-DD format
const getLast14Days = () => {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - i); // Adjust by subtracting days using UTC date
    date.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC
    days.push(date.toISOString().split("T")[0]); // Store date in YYYY-MM-DD format
  }

  return days.reverse(); // Reverse the array so that the latest day is first
};


// Main function to get all data for the users in the room
const getAllData = async (req, res) => {
  try {
    const { username } = req.body;

    // Fetch the user document based on the username
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const room = await RoomModel.findOne({ roomId: user.roomId });
    if (!room) return res.status(404).json({ msg: "Room not found" });

    const users = room.users; // List of usernames in the room
    if (!users || users.length === 0)
      return res.status(404).json({ msg: "No users found in this room" });

    // Get the last 14 days in YYYY-MM-DD format
    const last14Days = getLast14Days();

    // Aggregate user activity data
    const data = await aggregateUserActivity(users, last14Days);

    // Format the data for the response
    const result = formatUserData(users, last14Days, data);

    // Send the final data in the response
    // console.log("Data to be sent:", JSON.stringify(result, null, 2));
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching room data:", error);
    return res
      .status(500)
      .json({ msg: "Error fetching room data", error: error.message });
  }
};

// Function to aggregate user activity for the last 14 days
const aggregateUserActivity = async (users, last14Days) => {
  return HistoryModel.aggregate([
    {
      $match: {
        user: { $in: users }, // Match by usernames
        createdAt: { $gte: new Date(last14Days[0]) }, // Match activities from the last 14 days
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
        points: { $multiply: ["$tagCount", 2] },
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

// Function to format the aggregated data for the response
const formatUserData = (users, last14Days, data) => {
  // Create a map of aggregated data for fast lookup
  const dataMap = data.reduce((map, d) => {
    const key = `${d._id.user}_${d._id.day}`;
    map[key] = d.totalPoints;
    return map;
  }, {});

  const formattedData = {
    dates: last14Days,
    users: users.map((user) => {
      const points = last14Days.map((day) => {
        const key = `${user}_${day}`;
        return dataMap[key] || 0;
      });
      return { user, points };
    }),
  };
  return formattedData;
};

export { getAllData };
