import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries/characterQueries";
import CharacterRow from "./CharacterRow";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

export default function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const letterRefs = useRef({});

  const filtered = useMemo(() => {
    if (!data?.characters) return [];
    const q = search.toLowerCase().trim();
    return data.characters
      .filter((c) => !q || c.characterName?.toLowerCase().includes(q))
      .sort((a, b) => a.characterName?.localeCompare(b.characterName));
  }, [data, search]);

  // Letters that actually have results
  const availableLetters = useMemo(() => {
    const set = new Set(
      filtered.map((c) => c.characterName?.[0]?.toUpperCase()).filter(Boolean)
    );
    return set;
  }, [filtered]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map = {};
    for (const c of filtered) {
      const letter = c.characterName?.[0]?.toUpperCase() ?? "#";
      if (!map[letter]) map[letter] = [];
      map[letter].push(c);
    }
    return map;
  }, [filtered]);

  const jumpTo = (letter) => {
    const el = letterRefs.current[letter];
    if (el) {
      const offset = 140; // toolbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveLetter(letter);
    }
  };

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
      <div className="empty-state">Something went wrong loading characters.</div>
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
            placeholder="Search characters…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
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

        {/* A-Z nav */}
        <div className="alpha-nav">
          {LETTERS.map((letter) => (
            <button
              key={letter}
              className={`alpha-btn${activeLetter === letter ? " active" : ""}`}
              disabled={!availableLetters.has(letter)}
              onClick={() => jumpTo(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="result-count">
          {filtered.length} of {data?.characters?.length ?? 0} characters
        </div>
      </div>

      {/* List */}
      <div className="list-page">
        {Object.keys(grouped).length === 0 ? (
          <div className="empty-state">No characters match &ldquo;{search}&rdquo;</div>
        ) : (
          Object.keys(grouped)
            .sort()
            .map((letter) => (
              <div
                key={letter}
                className="letter-group"
                ref={(el) => { letterRefs.current[letter] = el; }}
              >
                <div className="letter-group-header">{letter}</div>
                {grouped[letter].map((character) => (
                  <CharacterRow key={character._id} character={character} />
                ))}
              </div>
            ))
        )}
      </div>

      <BackToTop />
    </>
  );
}
