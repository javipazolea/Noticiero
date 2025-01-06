import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const ChangePasswordModal = ({ open, onClose, changePassword, theme }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      onClose();
    } else {
      setPasswordError("La contraseña actual es incorrecta");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: theme === "dark" ? "#1E1E1E" : "#fff",
        },
      }}
      aria-labelledby="change-password-dialog"
    >
      <DialogTitle
        id="change-password-dialog"
        color={theme === "light" ? "primary" : "secondary"}
      >
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
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
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
  );
};

export default ChangePasswordModal;
