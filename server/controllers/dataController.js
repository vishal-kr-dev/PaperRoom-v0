import HistoryModel from "../models/HistorySchema.js";
import RoomModel from "../models/RoomSchema.js";
import UserModel from "../models/UserSchema.js";

// Utility function to generate the last 14 days in YYYY-MM-DD format
const getLast14Days = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0); // Set to midnight for consistency
    days.push(date.toISOString().split("T")[0]); // Store date in YYYY-MM-DD format
  }
  return days.reverse(); // To get the latest day first
};

const getAllData = async (req, res) => {
  try {
    // Assuming `req.username` is set by your auth middleware or hardcoding for now
    const username = "demo"; // Replace with `req.username` if using auth middleware

    // Fetch the user document based on the username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const roomId = user.roomId;

    // Fetch the room document based on roomId
    const room = await RoomModel.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // In the room, users are just strings (usernames), not ObjectIds
    const users = room.users; // List of usernames in the room
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found in this room" });
    }

    const last14Days = getLast14Days(); // List of all dates for the last 14 days

    // Aggregate user activity data for the last 14 days
    const data = await HistoryModel.aggregate([
      // Match only the users in the room and activities from the last 14 days
      {
        $match: {
          user: { $in: users }, // Match by username, not ObjectId
          createdAt: { $gte: new Date(last14Days[0]) }, // Match from the first date
        },
      },
      // Project day (YYYY-MM-DD) and calculate tagCount (number of tags)
      {
        $project: {
          user: 1,
          day: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          tagCount: { $size: "$tag" }, // Counts the number of tags
        },
      },
      // Calculate points based on tag count (2 points per tag)
      {
        $addFields: {
          points: { $multiply: ["$tagCount", 2] },
        },
      },
      // Group by user and day, summing up the points for each user
      {
        $group: {
          _id: { user: "$user", day: "$day" },
          totalPoints: { $sum: "$points" },
        },
      },
      // Sort by user and day (ascending)
      { $sort: { "_id.user": 1, "_id.day": 1 } },
    ]);

    // Log the aggregated data
    console.log("Aggregated Data:", data); // Debugging log

    // Now, we need to make sure that we have data for every day in the last 14 days
    const result = users.map((user) => {
      const userData = last14Days.map((day) => {
        // Find the data for the user and day, or default to 0 points
        const dayData = data.find(
          (d) => d._id.user === user && d._id.day === day
        );
        return {
          day,
          points: dayData ? dayData.totalPoints : 0, // If no data, set points to 0
        };
      });
      return { user, data: userData };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(
      `Error while fetching room data in dataController.js: ${error}`
    );
    res.status(500).json({
      msg: "Error while fetching room data in dataController.js",
      error: error.message,
    });
  }
};

export { getAllData };
