const Job = require("../models/Job");

// GET all jobs OR filter by location
const getJobs = async (req, res) => {
  try {
    const { location } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(query).sort({ postedDateTime: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {
  getJobs
};
