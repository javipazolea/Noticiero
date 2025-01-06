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

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

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
        }}
      >
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
                label={category.charAt(0).toUpperCase() + category.slice(1)}
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
