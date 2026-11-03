import { useEffect, useMemo, useState } from "react";
import { DiaryEntry } from "../context/DiaryContext";

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredEntries = useMemo(() => {
    let result = entries;
    if (moodFilter) {
      result = result.filter((entry) => entry.mood === moodFilter);
    }
    const q = debouncedQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q) ||
          e.date.toLowerCase().includes(q),
      );
    }
    return result;
  }, [entries, debouncedQuery, moodFilter]);

  const resetFilters = () => {
    setQuery("");
    setMoodFilter("");
  };

  return {
    query,
    setQuery,
    moodFilter,
    setMoodFilter,
    resetFilters,
    filteredEntries,
    resultCount: filteredEntries.length,
  };
}
