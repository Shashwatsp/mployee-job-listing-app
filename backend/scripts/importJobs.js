const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/Job");
const jobsData = require("../data/Mployee.me Task Data.json");

dotenv.config();

const importJobs = async () => {
  try {
    // connect to mongo
    await mongoose.connect(process.env.MONGODB_URI);

    // clean old data
    await Job.deleteMany();
    console.log("Existing jobs deleted");

    // format + clean data
    const formattedJobs = jobsData
      .map((job) => {
        const rawJobId = job["Job ID (Numeric)"];
        const jobIdNumber = Number(rawJobId);

        // skip invalid job IDs
        if (!rawJobId || isNaN(jobIdNumber)) {
          return null;
        }

        return {
          jobId: jobIdNumber,
          title: job.title,
          company: job.company,
          location: job.location,
          description: job.description || "",
          employment_type: job.employment_type,
          experience: job.experience,
          min_exp: job.min_exp,
          max_exp: job.max_exp,
          source: job.source,
          country: job.country,
          seniority_level: job.seniority_level,
          companytype: job.companytype,
          job_link: job.job_link,
          company_url: job.company_url,
          companyImageUrl: job.companyImageUrl,
          postedDateTime: job.postedDateTime?.$date
            ? new Date(job.postedDateTime.$date)
            : null
        };
      })
      .filter(Boolean); // remove null records

    // insert data
    await Job.insertMany(formattedJobs);

    console.log("Jobs imported successfully");
    process.exit();
  } catch (error) {
    console.error("Import failed:", error.message);
    process.exit(1);
  }
};

importJobs();
