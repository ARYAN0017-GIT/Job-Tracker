import React from "react";

const STATUS = {
  applied: { label: "Applied", colorClass: "status-applied" },
  interview: { label: "Interview", colorClass: "status-interview" },
  offer: { label: "Offer", colorClass: "status-offer" },
  rejected: { label: "Rejected", colorClass: "status-rejected" },
};

function getTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function JobCard({ job, onDelete }) {
  const companyInitial = job.company.charAt(0).toUpperCase();
  const isGmail = job.source === "gmail";
  return (
    <section className="card" data-source={job.source}>
      <div className="card-header">
        <div className="company-logo">{companyInitial}</div>

        <div className="header-actions">
          {/* We will wire up the Delete button in a future step! */}
          <button
            className="delete-btn"
            title="Delete job"
            onClick={() => onDelete(job.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>

          {isGmail ? (
            <button
              className={`status-badge ${STATUS[job.status].colorClass} locked`}
              title="Status auto-synced from Gmail"
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "12px",
                  marginRight: "4px",
                  verticalAlign: "middle",
                }}
              >
                lock
              </span>
              {STATUS[job.status].label}
            </button>
          ) : (
            <div className="status-wrapper">
              <button
                className={`status-badge ${STATUS[job.status].colorClass}`}
              >
                {STATUS[job.status].label}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="job-title">{job.role}</h3>
        <p className="company-name">{job.company}</p>
      </div>

      <div className="card-footer">
        <div className="meta-item">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l-5 5-3-3-4 4" />
            <circle cx="7" cy="7" r="6" />
          </svg>
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="10" height="10" rx="2" />
            <path d="M8 2v4M3 8h10" />
          </svg>
          <span>{getTimeAgo(job.createdAt)}</span>
        </div>
      </div>
    </section>
  );
}
