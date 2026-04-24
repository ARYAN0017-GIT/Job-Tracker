import React from "react";

export default function Controls({
  searchText,
  setSearchText,
  activeSort,
  setActiveSort,
  activeStatus,
  setActiveStatus,
  count,
}) {
  const statuses = [
    { id: "all", label: `All (${count?.all || 0})` },
    { id: "applied", label: `Applied (${count?.applied || 0})` },
    { id: "interview", label: `Interview (${count?.interview || 0})` },
    { id: "offer", label: `Offer (${count?.offer || 0})` },
    { id: "rejected", label: `Rejected (${count?.rejected || 0})` },
  ];

  return (
    <section className="m3-controls">
      {/* SEARCH BAR */}
      <div className="m3-search-bar">
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="9" r="7" />
          <path d="M14 14l5 5" />
        </svg>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* SORT CONTROLS */}
      <div className="sort-controls">
        <label htmlFor="sortSelect">Sort By:</label>
        <select
          id="sortSelect"
          className="sort-select"
          value={activeSort}
          onChange={(e) => setActiveSort(e.target.value)}
        >
          <option value="newest first">Newest First</option>
          <option value="oldest first">Oldest First</option>
          <option value="company a-z">Company A-Z</option>
        </select>
      </div>

      {/* STATUS CHIPS */}
      <div className="m3-chip-set">
        {statuses.map((status) => (
          <button
            key={status.id}
            className={`m3-chip ${activeStatus === status.id ? "active" : ""}`}
            onClick={() => setActiveStatus(status.id)}
            style={{ textTransform: "capitalize" }}
          >
            {status.label}
          </button>
        ))}
      </div>
    </section>
  );
}
