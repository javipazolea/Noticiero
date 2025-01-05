import React, { useContext } from "react";
import { Box, Typography, Container } from "@mui/material";
import { UserContext } from "../context/UserContext";
import Cards from "../components/Cards";

const FavoritesPage = () => {
  const { favorites, user } = useContext(UserContext);

  if (!user) {
    return (
      <Container>
        <Box
          sx={{
            minHeight: "100vh",
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
      <Container>
        <Box
          sx={{
            minHeight: "100vh",
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
    <Box sx={{ pt: 12, pb: 4 }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Mis Artículos Favoritos
        </Typography>
        <Cards articles={favorites} />
      </Container>
    </Box>
  );
};

export default FavoritesPage;
