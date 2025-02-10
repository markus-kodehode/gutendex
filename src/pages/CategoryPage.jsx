import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const { category, books, loading, error, searched } =
    useContext(CategoryContext);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (searched && books.length === 0) return <p>No books found in category.</p>;

  return (
    <>
      {/* Only render results if books are found */}
      {books.length > 0 && (
        <div className="book-container">
          <h1 className="text-center margin-bottom">
            Books in category "{category.toLowerCase()}"
          </h1>
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
