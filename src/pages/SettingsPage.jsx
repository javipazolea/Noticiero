import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  Box,
  Container,
  Paper,
  Typography,
  Switch,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";

const SettingsPage = () => {
  const {
    theme,
    setTheme,
    username,
    setUsername,
    user,
    updateProfile,
    changePassword,
  } = useContext(UserContext);

  // Estados locales
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [passwordError, setPasswordError] = useState("");
  const [tempUsername, setTempUsername] = useState(username);

  useEffect(() => {
    setTempUsername(username);
    setAvatar(user?.avatar || "");
  }, [username, user]);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const success = await changePassword(currentPassword, newPassword);

    if (success) {
      setPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setSnackbar({
        open: true,
        message: "Contraseña actualizada correctamente",
        severity: "success",
      });
    } else {
      setPasswordError("La contraseña actual es incorrecta");
    }
  };

  const handleSaveProfile = async () => {
    const success = await updateProfile({
      username: tempUsername,
      avatar,
    });

    if (success) {
      setUsername(tempUsername);
      setSnackbar({
        open: true,
        message: "Perfil actualizado correctamente",
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Error al actualizar el perfil",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={theme === "light" ? "primary" : "secondary"}
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
                <IconButton
                  color={theme === "light" ? "primary" : "secondary"}
                  component="span"
                  sx={{ ml: 2 }}
                >
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </label>
            </Box>
            <TextField
              fullWidth
              label="Nombre de usuario"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme === "dark" ? "#2D2D2D" : undefined,
                },
                "& .MuiInputLabel-root": {
                  color: theme === "dark" ? "#fff" : undefined,
                },
              }}
              InputProps={{
                style: {
                  color: theme === "light" ? "#000" : "#fff",
                },
              }}
            />
            <Button
              variant={theme === "light" ? "outlined" : "contained"}
              onClick={() => setPasswordDialogOpen(true)}
              sx={{
                mb: 3,
                color: theme === "light" ? "#1976d2" : "#90caf9",
              }}
            >
              Cambiar Contraseña
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {/* Sección de Preferencias */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              color={theme === "light" ? "text.primary" : "text.secondary"}
            >
              Preferencias
            </Typography>

            {/* Tema */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography
                sx={{
                  flex: 1,
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              >
                Tema Oscuro
              </Typography>
              <Switch
                checked={theme === "dark"}
                onChange={handleThemeChange}
                color={theme === "light" ? "primary" : "secondary"}
              />
            </Box>
          </Grid>

          {/* Botón Guardar */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant={theme === "light" ? "contained" : "outlined"}
                color={theme === "light" ? "primary" : "secondary"}
                onClick={handleSaveProfile}
                startIcon={<Save />}
                size="large"
              >
                Guardar Cambios
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Diálogo para cambiar contraseña */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => {
          setPasswordDialogOpen(false);
          setPasswordError("");
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: theme === "dark" ? "#1E1E1E" : "#fff",
            boxShadow:
              theme === "dark" ? "0 0 10px rgba(0,0,0,0.5)" : undefined,
          },
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
          },
          "& .MuiDialogTitle-root": {
            backgroundColor: theme === "dark" ? "#2D2D2D" : undefined,
            color: theme === "dark" ? "#fff" : undefined,
          },
          "& .MuiDialogContent-root": {
            backgroundColor: theme === "dark" ? "#1E1E1E" : undefined,
            color: theme === "dark" ? "#fff" : undefined,
          },
          "& .MuiDialogActions-root": {
            backgroundColor: theme === "dark" ? "#2D2D2D" : undefined,
            padding: 2,
          },
        }}
      >
        <DialogTitle color={theme === "light" ? "primary" : "secondary"}>
          Cambiar Contraseña
        </DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          <TextField
            fullWidth
            type="password"
            label="Contraseña actual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{
              mb: 2,
              mt: 1,
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme === "dark" ? "#2D2D2D" : undefined,
              },
              "& .MuiInputLabel-root": {
                color: theme === "dark" ? "#fff" : undefined,
              },
            }}
            InputProps={{
              style: {
                color: theme === "light" ? "#000" : "#fff",
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme === "dark" ? "#2D2D2D" : undefined,
              },
              "& .MuiInputLabel-root": {
                color: theme === "dark" ? "#fff" : undefined,
              },
            }}
            InputProps={{
              style: {
                color: theme === "light" ? "#000" : "#fff",
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme === "dark" ? "#2D2D2D" : undefined,
              },
              "& .MuiInputLabel-root": {
                color: theme === "dark" ? "#fff" : undefined,
              },
            }}
            InputProps={{
              style: {
                color: theme === "light" ? "#000" : "#fff",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPasswordDialogOpen(false);
              setPasswordError("");
            }}
            color={theme === "light" ? "primary" : "secondary"}
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            color={theme === "light" ? "primary" : "secondary"}
          >
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SettingsPage;
