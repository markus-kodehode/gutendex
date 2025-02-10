import "./App.css";
import { Outlet } from "react-router-dom";

// Components
import Header from "./components/Header";

// Context providers
import { SearchProvider } from "./context/SearchContext";
import { CategoryProvider } from "./context/CategoryContext";

export default function App() {
  return (
    <CategoryProvider>
      <SearchProvider>
        <Header />
        <div className="main-container">
          <Outlet />
        </div>
      </SearchProvider>
    </CategoryProvider>
  );
}
