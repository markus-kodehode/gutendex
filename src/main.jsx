import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Router components
import App from "./App.jsx";
import BookPage from "./pages/BookPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchResults from "./components/SearchResults.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <h1>Error, something went wrong and an oopsie has been made!</h1>
    ),
    children: [
      { index: true, element: <SearchResults /> },
      { path: "/book/:bookId", element: <BookPage /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
    ],
  },
  {
    path: "*",
    element: (
      <div className="error-page">
        <h1>404 - Page Not Found</h1>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
