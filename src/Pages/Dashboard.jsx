// src/pages/Dashboard.jsx
import { useState, useMemo, useEffect, useContext } from "react";
import { JobContext } from "../context/JobContext";
import Controls from "../components/Controls";
import JobCard from "../components/JobCard";
import AddJobModal from "../components/AddJobModal";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const { jobs, addJob, deleteJob } = useContext(JobContext);

  // Local Page UI States
  const [activeSort, setActiveSort] = useState("newest first");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, activeStatus, activeSort]);

  // The Math (Filtering & Counting)
  const searchFilteredJobs = useMemo(() => {
    if (searchText === "") return jobs;
    return jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(searchText.toLowerCase()) ||
        job.role.toLowerCase().includes(searchText.toLowerCase()) ||
        job.status.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [jobs, searchText]);

  const count = useMemo(() => {
    return {
      all: searchFilteredJobs.length,
      applied: searchFilteredJobs.filter(
        (j) => j.status.toLowerCase() === "applied",
      ).length,
      rejected: searchFilteredJobs.filter(
        (j) => j.status.toLowerCase() === "rejected",
      ).length,
      interview: searchFilteredJobs.filter(
        (j) => j.status.toLowerCase() === "interview",
      ).length,
      offer: searchFilteredJobs.filter(
        (j) => j.status.toLowerCase() === "offer",
      ).length,
    };
  }, [searchFilteredJobs]);

  const filteredandSortedJobs = useMemo(() => {
    let result = searchFilteredJobs;
    if (activeStatus !== "all") {
      result = result.filter(
        (job) => job.status.toLowerCase() === activeStatus.toLowerCase(),
      );
    }
    return [...result].sort((a, b) => {
      if (activeSort === "newest first") return b.createdAt - a.createdAt;
      if (activeSort === "oldest first") return a.createdAt - b.createdAt;
      if (activeSort === "company a-z")
        return a.company.localeCompare(b.company);
      return 0;
    });
  }, [searchFilteredJobs, activeSort, activeStatus]);

  const totalPages = Math.ceil(filteredandSortedJobs.length / itemPerPage);

  const PaginationJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return filteredandSortedJobs.slice(startIndex, endIndex);
  }, [filteredandSortedJobs, currentPage]);

  // Render the Dashboard
  return (
    <div style={{ paddingBottom: "100px" }}>
      <Controls
        searchText={searchText}
        setSearchText={setSearchText}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        count={count}
      />

      <main className="card-grid">
        {PaginationJobs.length === 0 ? (
          <div className="empty-state">
            <h3>No Jobs Found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          PaginationJobs.map((job) => (
            <JobCard key={job?.id} job={job} onDelete={deleteJob} />
          ))
        )}
      </main>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <div className={`fab-menu ${!isFabMenuOpen ? "hidden" : ""}`}>
        <div
          className="fab-item"
          onClick={() => {
            setIsFabMenuOpen(false);
            setIsModalOpen(true);
          }}
        >
          <span className="material-symbols-outlined">edit_document</span> Add
          Manually
        </div>
        <div
          className="fab-item"
          onClick={() => {
            alert("Phase 3!");
            setIsFabMenuOpen(false);
          }}
        >
          <span className="material-symbols-outlined">mail</span> Sync from
          Gmail
        </div>
      </div>
      <button
        className="fab-extended"
        onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
      >
        <span className="material-symbols-outlined">add</span> New
      </button>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addJob}
      />
    </div>
  );
}
