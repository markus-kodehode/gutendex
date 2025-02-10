import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load favorites directly from localStorage into state
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${bookId}/`);
        if (!response.ok) throw new Error("Book not found");

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Check if the book is already in favorites
  const isFavorite = book && favorites.some((fav) => fav.id === book.id);

  // Toggle favorite status
  function toggleFavorite() {
    if (!book) return;

    setFavorites((prevFavorites) => {
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== book.id) // Remove from favorites
        : [
            ...prevFavorites,
            { id: book.id, title: book.title, cover: coverImage },
          ]; // Add to favorites

      return updatedFavorites;
    });
  }

  // Loading & error states
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  // Check for available cover format
  const coverImage =
    book.formats["image/jpeg"] || book.formats["image/png"] || null;

  return (
    <div className="book-container">
      {/* Buttons */}
      <div className="book-button-group">
        <button className="button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button
          className={`button ${isFavorite ? "unfavorite-button" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>

      {/* Title & Author */}
      <div className="text-center">
        <h1 className="title">{book.title}</h1>
        {book.authors.length > 0 && (
          <h3 className="book-author">
            by {book.authors.map((a) => a.name).join(", ")}
          </h3>
        )}
      </div>

      {/* Book cover */}
      {coverImage ? (
        <img
          src={coverImage}
          alt={`${book.title} cover`}
          className="book-cover"
        />
      ) : (
        <p className="no-cover">No cover available</p>
      )}

      {/* Summary */}
      {book.summaries && book.summaries.length > 0 ? (
        <>
          <p className="summary-text">{book.summaries.join(" ")}</p>
          <hr className="summary-break" />
        </>
      ) : (
        <p className="no-summary">No summary available.</p>
      )}

      <p className="book-downloads">
        <strong>Downloads:</strong> {book.download_count}
      </p>

      {/* Subjects */}
      {book.subjects.length > 0 && (
        <div className="info-section">
          <h3 className="info-title">Subjects</h3>
          <ul className="info-list">
            {book.subjects.map((subject, index) => (
              <li key={index} className="info-item">
                {subject}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {book.languages.length > 0 && (
        <div className="info-section">
          <h3 className="info-title">Languages</h3>
          <ul className="info-list">
            {book.languages.map((lang, index) => (
              <li key={index} className="info-item">
                {lang}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formats */}
      {book.formats && (
        <div className="info-section">
          <h3 className="info-title">Available Formats</h3>
          <ul className="info-list">
            {Object.entries(book.formats).map(([key, value], index) => (
              <li key={index} className="info-item">
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="format-link"
                >
                  {key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
