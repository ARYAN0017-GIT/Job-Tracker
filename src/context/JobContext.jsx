// src/context/JobContext.jsx
import { createContext, useState, useEffect } from "react";
import { defaultJobs } from "../data";

export const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("JobTracker_React");
    return savedJobs ? JSON.parse(savedJobs) : defaultJobs;
  });

  // Save to LocalStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem("JobTracker_React", JSON.stringify(jobs));
  }, [jobs]);

  // The Action Functions
  const addJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Package everything up and provide it to the rest of the app
  const value = {
    jobs,
    addJob,
    deleteJob,
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}
