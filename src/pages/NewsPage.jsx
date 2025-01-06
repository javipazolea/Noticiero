import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Pagination from "../components/paginacion/Pagination";
import Footer from "../components/Footer";
import { Box, Typography, Container } from "@mui/material";
import UserGreeting from "../components/UserGreeting";

const NewsPage = () => {
  const { country, articles, error, fetchNews, theme, user } =
    useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    const apiKey = "11b465cd6c684f83a7886695c2211daf";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    fetchNews(url);
  }, [fetchNews]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.documentElement.scrollHeight / 3,
      behavior: "smooth",
    });
  };

  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="xl" sx={{ flex: 1, paddingTop: "7rem" }}>
        {" "}
        {/* titulo */}
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
          Bienvenido al Portal de Noticias
        </Typography>
        {user && <UserGreeting />}
        {/* Seccion de Categorias  */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              borderBottom: `2px solid ${
                theme === "light" ? "#1a237e" : "#fff"
              }`,
              paddingBottom: "0.5rem",
              color: theme === "light" ? "#1a237e" : "#fff",
              animation: "fadeIn 1s ease-in",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Explora por Categorías:
          </Typography>
          <Carousel />
        </Box>
        {/* Seccion de Noticias Recientes */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              borderBottom: `2px solid ${
                theme === "light" ? "#1a237e" : "#fff"
              }`,
              paddingBottom: "0.5rem",
              color: theme === "light" ? "#1a237e" : "#fff",
              animation: "fadeIn 1s ease-in",
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateY(-20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Noticias Recientes:
          </Typography>

          {error ? (
            <Typography color="error">
              Error al cargar las noticias: {error}
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
      </Container>

      <Footer />
    </Box>
  );
};

export default NewsPage;
