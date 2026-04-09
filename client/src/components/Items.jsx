import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../queries/itemQueries";
import ItemRow from "./ItemRow";

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

export default function Items() {
  const { loading, error, data } = useQuery(GET_ITEMS);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!data?.items) return [];
    const q = search.toLowerCase().trim();
    return data.items
      .filter((i) => !q || i.itemName?.toLowerCase().includes(q))
      .sort((a, b) => a.itemName?.localeCompare(b.itemName));
  }, [data, search]);

  if (loading)
    return (
      <div className="list-loading">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-row" />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="empty-state">Something went wrong loading items.</div>
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
            placeholder="Search items…"
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
          {filtered.length} of {data?.items?.length ?? 0} items
        </div>
      </div>

      <div className="list-page">
        {filtered.length === 0 ? (
          <div className="empty-state">No items match &ldquo;{search}&rdquo;</div>
        ) : (
          filtered.map((item) => (
            <ItemRow key={item._id} item={item} />
          ))
        )}
      </div>

      <BackToTop />
    </>
  );
}
