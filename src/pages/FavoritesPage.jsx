import React, { useContext } from "react";
import { Box, Typography, Container, Fab } from "@mui/material";
import { UserContext } from "../context/UserContext";
import Cards from "../components/Cards";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const FavoritesPage = () => {
  const { favorites, user, theme } = useContext(UserContext);

  // Función para desplazarse al inicio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fabColor = theme === "light" ? "primary" : "secondary";

  if (!user) {
    return (
      <Container
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 10,
          }}
        >
          <Typography variant="h5">
            Inicia sesión para ver tus artículos favoritos
          </Typography>
        </Box>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 10,
          }}
        >
          <Typography variant="h5">
            No tienes artículos favoritos guardados
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        pt: 12,
        pb: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container sx={{ flex: 1 }}>
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
          Mis Artículos Favoritos
        </Typography>
        <Cards articles={favorites} />
      </Container>
      {/* Botón flotante "Back to Top" */}
      <Fab
        color={fabColor}
        aria-label="back to top"
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Box>
  );
};

export default FavoritesPage;
