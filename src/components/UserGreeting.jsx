import React, { useContext } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";

const UserGreeting = () => {
  const { username, theme, user } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 2,
        borderRadius: 1,
        backgroundColor:
          theme === "light"
            ? "rgba(26, 35, 126, 0.08)"
            : "rgba(255, 255, 255, 0.08)",
        mb: 4,
        animation: "fadeIn 0.8s ease-in",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Avatar
        src={user?.avatar || ""}
        alt={username}
        sx={{
          width: 150,
          height: 150,
          bgcolor: theme === "light" ? "primary.main" : "secondary.main",
          marginLeft: "20px",
        }}
      >
        {!user?.avatar && <AccountCircle />}
      </Avatar>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: theme === "light" ? "#1a237e" : "#fff",
          fontWeight: 500,
          marginRight: "20px",
        }}
      >
        ¡Hola, {username}. Nos alegra verte de vuelta en Up News!
      </Typography>
    </Box>
  );
};

export default UserGreeting;
