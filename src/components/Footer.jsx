import React, { useContext } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { UserContext } from "../context/UserContext";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

const Footer = () => {
  const { theme } = useContext(UserContext);

  const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com", name: "Facebook" },
    { icon: <Twitter />, url: "https://twitter.com", name: "Twitter" },
    { icon: <Instagram />, url: "https://instagram.com", name: "Instagram" },
    { icon: <LinkedIn />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <GitHub />, url: "https://github.com", name: "GitHub" },
  ];

  return (
    <Box
      sx={{
        bgcolor: theme === "light" ? "#1a237e" : "#000",
        color: "#fff",
        py: 6,
        mt: "auto", // Esto hace que el footer se empuje al final
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Portal de Noticias UpNews
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Tu fuente confiable de noticias e información actualizada.
              Mantente informado con las últimas noticias nacionales e
              internacionales.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "#90caf9",
                      transform: "scale(1.1)",
                      transition: "all 0.3s",
                    },
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            mt: 4,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            © {new Date().getFullYear()} Portal de Noticias UpNews. Todos los
            derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
