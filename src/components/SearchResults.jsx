import { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { Link } from "react-router-dom";

export default function SearchResults() {
  const { books, loading, error, searched } = useContext(SearchContext);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (searched && books.length === 0) return <p>No matches found</p>;

  return (
    <>
      {/* Only render search results if a search was made */}
      {searched && books.length > 0 && (
        <div className="book-container">
          <ul className="book-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <Link to={`/book/${book.id}`} className="link">
                  <strong>{book.title}</strong>
                </Link>
                {book.authors.length > 0 && (
                  <>
                    {" "}
                    by {book.authors.map((author) => author.name).join(", ")}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
