const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const jobRoutes = require("./routes/job.routes");
app.use("/api/jobs", jobRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Mployee Job API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
