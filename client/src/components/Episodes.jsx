import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../queries/episodeQueries";

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

export default function Episodes() {
  const { loading, error, data } = useQuery(GET_EPISODES);
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("all");

  const seasons = useMemo(() => {
    if (!data?.episodes) return [];
    const nums = [...new Set(data.episodes.map((e) => e.season).filter((s) => s != null))];
    return nums.sort((a, b) => a - b);
  }, [data]);

  const filtered = useMemo(() => {
    if (!data?.episodes) return [];
    const q = search.toLowerCase().trim();
    return data.episodes
      .filter((e) => {
        const matchSearch = !q || e.episodeName?.toLowerCase().includes(q);
        const matchSeason = season === "all" || String(e.season) === String(season);
        return matchSearch && matchSeason;
      })
      .sort((a, b) => {
        if (a.season !== b.season) return (a.season ?? 0) - (b.season ?? 0);
        return (a.episode ?? 0) - (b.episode ?? 0);
      });
  }, [data, search, season]);

  // Group by season for display (only when not filtering by a single season)
  const grouped = useMemo(() => {
    if (season !== "all") return { [season]: filtered };
    const map = {};
    for (const ep of filtered) {
      const s = ep.season ?? "?";
      if (!map[s]) map[s] = [];
      map[s].push(ep);
    }
    return map;
  }, [filtered, season]);

  if (loading)
    return (
      <div className="list-loading">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="skeleton-row" />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="empty-state">Something went wrong loading episodes.</div>
    );

  return (
    <>
      {/* Sticky toolbar */}
      <div className="list-toolbar">
        <div className="search-bar-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-input"
            placeholder="Search episodes…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSeason("all"); }}
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

        {/* Season pills */}
        <div className="filter-pills">
          <button
            className={`filter-pill${season === "all" ? " active" : ""}`}
            onClick={() => { setSeason("all"); setSearch(""); }}
          >
            All Seasons
          </button>
          {seasons.map((s) => (
            <button
              key={s}
              className={`filter-pill${String(season) === String(s) ? " active" : ""}`}
              onClick={() => { setSeason(String(s)); setSearch(""); }}
            >
              Season {s}
            </button>
          ))}
        </div>

        <div className="result-count">
          {filtered.length} of {data?.episodes?.length ?? 0} episodes
        </div>
      </div>

      {/* List */}
      <div className="list-page">
        {filtered.length === 0 ? (
          <div className="empty-state">
            {search ? `No episodes match "${search}"` : "No episodes found."}
          </div>
        ) : (
          Object.keys(grouped)
            .sort((a, b) => Number(a) - Number(b))
            .map((s) => (
              <div key={s} className="season-group">
                <div className="season-group-header">Season {s}</div>
                {grouped[s].map((ep) => (
                  <Link
                    key={ep._id}
                    to={`/episode/${encodeURIComponent(ep.episodeName)}`}
                    className="episode-card"
                  >
                    <span className="episode-number">E{ep.episode}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="episode-name">{ep.episodeName}</div>
                      {ep.description && (
                        <div className="episode-desc">{ep.description}</div>
                      )}
                    </div>
                    <svg className="episode-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            ))
        )}
      </div>

      <BackToTop />
    </>
  );
}
