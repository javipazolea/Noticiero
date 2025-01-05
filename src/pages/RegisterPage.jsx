import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import Register from "../components/iniciosesion/Register";
import { UserContext } from "../context/UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
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
        }}
      >
        <Register onSubmit={handleSubmit} error={error} />
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/login")}
          sx={{ mt: 2 }}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
