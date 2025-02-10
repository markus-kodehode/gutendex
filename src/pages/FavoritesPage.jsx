import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove a book from favorites
  const handleUnfavorite = (bookId) => {
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((book) => (
            <div key={book.id} className="favorite-card">
              <h2>{book.title}</h2>
              <img
                src={book.cover}
                alt={book.title}
                className="favorite-cover"
              />
              <div className="favorite-button-group">
                <Link to={`/book/${book.id}`}>
                  <button className="button">View</button>
                </Link>
                <button
                  className="button unfavorite-button"
                  onClick={() => handleUnfavorite(book.id)}
                >
                  Unfavorite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
