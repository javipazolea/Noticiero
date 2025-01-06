import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import Register from "../components/iniciosesion/Register";
import { UserContext } from "../context/UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login, theme } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleSubmit = (data) => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some((user) => user.email === data.email);

    if (userExists) {
      setError("Este email ya está registrado");
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    login(newUser);
    navigate("/news");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme === "light" ? "#fff" : "#1a1a1a",
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
        }}
      >
        <Register onSubmit={handleSubmit} error={error} theme={theme} />
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/login")}
          sx={{
            mt: 2,
            color: theme === "light" ? "#1976d2" : "#90caf9",
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
