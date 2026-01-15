const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      index: true
    },

    description: {
      type: String
    },

    employment_type: {
      type: String
    },

    experience: {
      type: String
    },

    min_exp: {
      type: Number
    },

    max_exp: {
      type: Number
    },

    source: {
      type: String
    },

    country: {
      type: String
    },

    seniority_level: {
      type: String
    },

    companytype: {
      type: String
    },

    job_link: {
      type: String
    },

    company_url: {
      type: String
    },

    companyImageUrl: {
      type: String
    },

    postedDateTime: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Job", jobSchema);
