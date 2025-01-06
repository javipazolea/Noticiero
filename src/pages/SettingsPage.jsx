import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import ChangePasswordModal from "../components/modal/ChangePasswordModal";

const SettingsPage = () => {
  const {
    theme,
    username,
    setUsername,
    user,
    updateProfile,
    changePassword,
    logout,
  } = useContext(UserContext);

  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [tempUsername, setTempUsername] = useState(username);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  useEffect(() => {
    // Al montar la página, actualiza el avatar y el nombre de usuario si están en el localStorage
    const storedUsername = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedUsername) setTempUsername(storedUsername);
    if (storedAvatar) setAvatar(storedAvatar);
  }, [username, user]); // Depender de `username` y `user` asegura que se actualice cuando el usuario cambie

  const handleSaveProfile = async () => {
    const success = await updateProfile({ username: tempUsername, avatar });
    if (success) {
      setUsername(tempUsername);
      // Guardar datos en Local Storage
      localStorage.setItem("username", tempUsername);
      localStorage.setItem("avatar", avatar);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);
        // Guardar en Local Storage al cambiar la imagen
        localStorage.setItem("avatar", newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // Limpiar localStorage al hacer logout
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    logout(); // Llamada para cerrar sesión, si tienes este método
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4, marginTop: "200px" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        }}
      >
        <Typography
          variant="h3"
          component="h5"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: theme === "light" ? "#1a237e" : "#fff",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Configuración
        </Typography>

        <Grid container spacing={4}>
          {/* Sección de Perfil */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              color={theme === "light" ? "text.primary" : "text.secondary"}
            >
              Perfil
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar src={avatar} sx={{ width: 100, height: 100, mr: 2 }} />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span">
                  Cambiar Avatar
                </Button>
              </label>
            </Box>
            <TextField
              fullWidth
              label="Nombre de usuario"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              onClick={() => setPasswordDialogOpen(true)}
              sx={{ mb: 3 }}
            >
              Cambiar Contraseña
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Botón Guardar */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProfile}
              >
                Guardar Cambios
              </Button>
            </Box>
          </Grid>

          {/* Agregar un botón de logout */}
        </Grid>
      </Paper>

      {/* Modal de cambio de contraseña */}
      <ChangePasswordModal
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        changePassword={changePassword}
        theme={theme}
      />
    </Container>
  );
};

export default SettingsPage;
