import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box } from "@mui/material";
import Login from "../components/iniciosesion/Login";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      login(user);
      navigate("/news");
    } else {
      setError("Email o contraseña incorrectos");
    }
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
        <Login onSubmit={handleSubmit} error={error} />
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/register")}
          sx={{ mt: 2 }}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
