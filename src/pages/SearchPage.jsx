import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards";
import Pagination from "../components/paginacion/Pagination";
import { UserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";

const SearchPage = () => {
  const { fetchNews, articles, error, theme } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=11b465cd6c684f83a7886695c2211daf`;
    fetchNews(url);
  }, [location.search, fetchNews]);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4">
      {/* título */}
      <Typography
        variant="h2"
        component="h1"
        align="center"
        sx={{
          mb: 4,
          mt: 8,
          pt: 4,
          fontWeight: "bold",
          color: theme === "light" ? "#1a237e" : "#fff",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.5s ease-in",
          "@keyframes fadeIn": {
            "0%": {
              opacity: 0,
              transform: "translateY(-20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        Resultados de la búsqueda
      </Typography>

      {error ? (
        <p
          className={`text-center ${
            theme === "light" ? "text-red-600" : "text-red-400"
          }`}
        >
          Error al cargar noticias: {error}
        </p>
      ) : (
        <>
          <Cards articles={currentArticles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
