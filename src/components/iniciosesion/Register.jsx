import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  Alert,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NewsIcon from "@mui/icons-material/Newspaper";

const Register = ({ onSubmit, error, theme }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Fade in timeout={1000}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          maxWidth: 400,
          mx: "auto",
          backgroundColor: theme === "light" ? "#fff" : "#1a1a1a",
        }}
      >
        <NewsIcon
          sx={{
            fontSize: 40,
            mb: 2,
            color: theme === "light" ? "primary.main" : "secondary.main",
          }}
        />
        <Typography
          component="h1"
          variant="h5"
          gutterBottom
          color={theme === "light" ? "black" : "white"}
        >
          Crear Cuenta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Nombre"
            {...register("name", {
              required: "El nombre es requerido",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{
              style: {
                color: theme === "light" ? "#000" : "#fff",
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              style: {
                color: theme === "light" ? "#000" : "#fff",
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              style: {
                color: theme === "light" ? "#000" : "#fff",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    color={theme === "light" ? "primary" : "secondary"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant={theme === "light" ? "contained" : "outlined"}
            color={theme === "light" ? "primary" : "secondary"}
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default Register;
