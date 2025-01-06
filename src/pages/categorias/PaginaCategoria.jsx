import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import Pagination from "../../components/paginacion/Pagination";
import { useLoading } from "../../context/LoadingContext";
import { UserContext } from "../../context/UserContext";
import { Typography, Box } from "@mui/material";

const PaginaCategoria = () => {
  const { categoria } = useParams();
  const { theme } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();
  const articlesPerPage = 6;

  // Mapeo de categorías  a español
  const categoryTranslations = {
    business: "Negocios",
    entertainment: "Entretenimiento",
    general: "General",
    health: "Salud",
    science: "Ciencia",
    sports: "Deportes",
    technology: "Tecnología",
  };

  const translatedCategory = categoryTranslations[categoria] || categoria;

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setIsLoading(true);
      try {
        const apiKey = "11b465cd6c684f83a7886695c2211daf";
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${categoria}&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const filteredArticles = data.articles.filter(
          (article) =>
            article.title !== "Removed" &&
            article.urlToImage &&
            article.urlToImage.startsWith("http")
        );
        setArticles(filteredArticles);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryNews();
  }, [categoria, setIsLoading]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <Box
      sx={{
        pt: 15,
        px: 3,
        minHeight: "100vh",
      }}
    >
      {/* Título */}
      <Typography
        variant="h2"
        component="h1"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: theme === "light" ? "#1a237e" : "#fff",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.5s ease-in",
          "@keyframes fadeIn": {
            "0%": { opacity: 0, transform: "translateY(-20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        Noticias de {translatedCategory}
      </Typography>
      {error ? (
        <Typography color="error" align="center">
          Error loading news: {error}
        </Typography>
      ) : (
        <>
          <Cards articles={displayedArticles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
};

export default PaginaCategoria;
