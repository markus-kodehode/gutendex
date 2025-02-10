import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (category) {
      fetchBooksByCategory(category);
    }
  }, [category]);

  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const response = await fetch(
        `https://gutendex.com/books?topic=${category}`
      );
      if (!response.ok) throw new Error("Failed to fetch books");

      const data = await response.json();
      setBooks(data.results || []);
      setSearched(true);
    } catch (err) {
      setError(err.message);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ category, setCategory, books, loading, error, searched }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
