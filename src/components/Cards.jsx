import React, { useState, useContext } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import NewsModal from "./modal/NewsModal";
import { UserContext } from "../context/UserContext";

const Cards = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [flippedId, setFlippedId] = useState(null);
  const {
    user,
    addToFavorites,
    removeFromFavorites,
    isArticleFavorite,
    theme,
  } = useContext(UserContext);

  const openModal = (article, index) => {
    setSelectedArticle(article);
    setFlippedId(index);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setFlippedId(null);
  };

  const handleFavoriteClick = (e, article) => {
    e.stopPropagation();
    if (!user) return;

    if (isArticleFavorite(article.title)) {
      removeFromFavorites(article.title);
    } else {
      addToFavorites(article);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: 3,
        padding: 2,
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {articles.map((article, index) => (
        <Box
          key={index}
          sx={{
            perspective: "1000px",
            height: 450,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
              transform:
                flippedId === index ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                backgroundColor: theme === "light" ? "#fff" : "#333", // Fondo dinámico
                color: theme === "light" ? "#000" : "#fff", // Texto dinámico
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
              }}
            >
              <img
                src={article.urlToImage || "/assets/image/default.jpg"}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "60%",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      height: "4.5em",
                      overflow: "hidden",
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {article.title}
                  </Typography>
                  {user && (
                    <IconButton
                      onClick={(e) => handleFavoriteClick(e, article)}
                      color={theme === "light" ? "primary" : "secondary"} // Icono dinámico
                      sx={{ ml: 1 }}
                    >
                      {isArticleFavorite(article.title) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color={theme === "light" ? "primary" : "secondary"} // Botón dinámico
                  onClick={() => openModal(article, index)}
                >
                  Ver más
                </Button>
              </Box>
            </Box>

            {/* Back */}
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                backgroundColor: theme === "light" ? "#eee" : "#1a1a1a", // Fondo dinámico
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
              }}
            >
              <img
                src={article.urlToImage || "/assets/image/default.jpg"}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}

      {selectedArticle && (
        <NewsModal article={selectedArticle} closeModal={closeModal} />
      )}
    </Box>
  );
};

export default Cards;
