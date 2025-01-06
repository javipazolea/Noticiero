import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Stack,
} from "@mui/material";

// Mapeo de traducciones de categorías
const categoryTranslations = {
  business: "Negocios",
  entertainment: "Entretenimiento",
  general: "General",
  health: "Salud",
  science: "Ciencia",
  sports: "Deportes",
  technology: "Tecnología",
};

const categories = Object.keys(categoryTranslations);

const SearchModal = ({ open, onClose }) => {
  const { theme } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      q: searchQuery,
      categories: selectedCategories.join(","),
    });

    navigate(`/search?${searchParams.toString()}`);
    setSearchQuery("");
    setSelectedCategories([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="search-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme === "light" ? "#fff" : "#1a1a1a",
          color: theme === "light" ? "#000" : "#fff",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Botón "X" para cerrar el modal */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: theme === "light" ? "#f5f5f5" : "#333",
            color: theme === "light" ? "#000" : "#fff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s",
          }}
        >
          ×
        </button>

        <Typography id="search-modal-title" variant="h6" component="h2" mb={3}>
          Búsqueda Avanzada
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Buscar noticias"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              input: {
                color: theme === "light" ? "#000" : "#fff",
              },
              label: {
                color: theme === "light" ? "#000" : "#fff",
              },
            }}
          />

          <Typography variant="subtitle1">Categorías</Typography>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    sx={{
                      color: theme === "light" ? "#000" : "#fff",
                      "&.Mui-checked": {
                        color: theme === "light" ? "#1976d2" : "#90caf9",
                      },
                    }}
                  />
                }
                label={categoryTranslations[category]} // Mostrar traducción
                sx={{
                  color: theme === "light" ? "#000" : "#fff",
                }}
              />
            ))}
          </FormGroup>

          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            sx={{
              backgroundColor: theme === "light" ? "#1976d2" : "#90caf9",
              color: theme === "light" ? "#fff" : "#000",
              "&:hover": {
                backgroundColor: theme === "light" ? "#1565c0" : "#42a5f5",
              },
            }}
          >
            Buscar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SearchModal;
