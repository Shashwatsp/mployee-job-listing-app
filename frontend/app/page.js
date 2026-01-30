"use client";

import { useEffect, useState } from "react";


function Spinner() {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      <span className="text-sm text-gray-600">Loading jobs…</span>
    </div>
  );
}


function formatDate(date) {
  if (!date) return "N/A";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "N/A";

  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Pagination ---------- */

  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 20;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* Fetch Jobs  */

  const fetchJobs = async (search = "") => {
    setLoading(true);
    setError("");

    try {
      if (!API_URL) throw new Error("API URL not configured");

      const url = search
        ? `${API_URL}/api/jobs?location=${encodeURIComponent(search)}`
        : `${API_URL}/api/jobs`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      setJobs(Array.isArray(data?.data) ? data.data : []);
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
      setJobs([]);
      setError("Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* Debounced Search */
  useEffect(() => {
    if (location.trim().length === 0) {
      setCurrentPage(1);
      fetchJobs();
      return;
    }

    if (location.trim().length < 3) {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchJobs(location);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  /* -- Pagination Logic -- */
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = jobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  return (
    <div className="h-screen flex bg-gray-100 text-gray-900">
     
      {/* ==== LEFT PANEL ====*/}

      <aside className="w-[38%] bg-white border-r overflow-y-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <h1 className="text-xl font-bold mb-3">Job Listings</h1>

          <input
            type="text"
            placeholder="Search by location (min 3 chars)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading && <Spinner />}

        {!loading && error && (
          <p className="p-4 text-sm text-red-600">{error}</p>
        )}

        {!loading && !error && paginatedJobs.length === 0 && (
          <p className="p-4 text-sm text-gray-500">No jobs found.</p>
        )}

        {!loading &&
          !error &&
          paginatedJobs.map((job) => (
            <div
              key={job.jobId}
              onClick={() => setSelectedJob(job)}
              className={`mx-3 my-3 rounded-lg border p-4 cursor-pointer transition-all
                ${
                  selectedJob?.jobId === job.jobId
                    ? "border-blue-600 bg-blue-50 shadow"
                    : "hover:shadow hover:-translate-y-px"
                }`}
            >
              <h2 className="font-semibold text-sm">{job.title}</h2>
              <p className="text-xs text-gray-600 mt-1">
                📍 {job.location}
              </p>
            </div>
          ))}

        {/* Pagination Controls*/}
       
        {!loading && jobs.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer "
            >
              Next
            </button>
          </div>
        )}
      </aside>

      {/* ================= RIGHT PANEL ================= */}
      
      <main className="flex-1 overflow-y-auto">
        {!selectedJob ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-lg">
            Select a job to view details
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{selectedJob.title}</h1>
              <p className="text-gray-600 mt-1">
                🏢 {selectedJob.company} • 📍 {selectedJob.location}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white border rounded-lg p-4">
                <p className="text-gray-500">Employment Type</p>
                <p className="font-medium">
                  {selectedJob.employment_type || "N/A"}
                </p>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <p className="text-gray-500">Experience Range</p>
                <p className="font-medium">
                  {selectedJob.experience || "N/A"}
                </p>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <p className="text-gray-500">Posted Date</p>
                <p className="font-medium">
                  {formatDate(selectedJob.postedDateTime)}
                </p>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <p className="text-gray-500">Source</p>
                <p className="font-medium capitalize">
                  {selectedJob.source || "N/A"}
                </p>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">
                Job Description
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedJob.description ||
                  "The employer has not provided a detailed job description for this role."}
              </p>
            </div>

            {selectedJob.job_link && (
              <a
                href={selectedJob.job_link}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#00ff99] text-black font-medium px-6 py-2 rounded-md hover:bg-[#00e187] transition"
              >
                Apply Now
              </a>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
