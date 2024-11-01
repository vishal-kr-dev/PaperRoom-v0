import HistoryModel from "../models/HistorySchema.js";

const putData = async () => {
  try {
    const { description, tag, duration } = req.body;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await HistoryModel.findOne(req.body.username);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllData;
