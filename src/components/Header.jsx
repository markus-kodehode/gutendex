import { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { CategoryContext } from "../context/CategoryContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

export default function BookSearch() {
  const { query, setQuery, fetchBooks } = useContext(SearchContext);
  const { setCategory } = useContext(CategoryContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchBooks("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => fetchBooks(query), 100);
      } else {
        fetchBooks(query);
      }
    }
  };

  return (
    <header>
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">SEARCH</button>
      </form>

      <div className="header-links">
        <Link to="/" className="link">
          <h2>Home</h2>
        </Link>
        <Link to="/favorites" className="link">
          <h2>Favorites</h2>
        </Link>
      </div>

      <div className="categories">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="link"
            onClick={() => setCategory(category)}
          >
            <strong>{category}</strong>
          </Link>
        ))}
      </div>
    </header>
  );
}
