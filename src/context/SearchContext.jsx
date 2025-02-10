import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchBooks = async (searchTerm) => {
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const response = await fetch(
        `https://gutendex.com/books/?search=${searchTerm}`
      );
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();

      // Filters out book with same ID but in different editions
      const uniqueBooks = Array.from(
        new Map(data.results.map((book) => [book.id, book])).values()
      );

      setBooks(uniqueBooks);
      setSearched(true);
    } catch (err) {
      setError(err.message);
      setBooks([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, books, loading, error, searched, fetchBooks }}
    >
      {children}
    </SearchContext.Provider>
  );
}
