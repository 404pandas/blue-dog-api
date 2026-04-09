import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SHORTS } from "../queries/shortQueries";
import ShortRow from "./ShortRow";

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-to-top${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default function Shorts() {
  const { loading, error, data } = useQuery(GET_SHORTS);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!data?.shorts) return [];
    const q = search.toLowerCase().trim();
    return data.shorts
      .filter((s) => !q || s.shortName?.toLowerCase().includes(q))
      .sort((a, b) => a.shortName?.localeCompare(b.shortName));
  }, [data, search]);

  if (loading)
    return (
      <div className="list-loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-row" />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="empty-state">Something went wrong loading shorts.</div>
    );

  return (
    <>
      <div className="list-toolbar">
        <div className="search-bar-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search shorts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1 }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <div className="result-count">
          {filtered.length} of {data?.shorts?.length ?? 0} shorts
        </div>
      </div>

      <div className="list-page">
        {filtered.length === 0 ? (
          <div className="empty-state">No shorts match &ldquo;{search}&rdquo;</div>
        ) : (
          filtered.map((short) => (
            <ShortRow key={short._id} short={short} />
          ))
        )}
      </div>

      <BackToTop />
    </>
  );
}
