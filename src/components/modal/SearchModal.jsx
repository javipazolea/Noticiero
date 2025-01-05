import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Stack
} from '@mui/material';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

const SearchModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
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
      categories: selectedCategories.join(','),
    });

    navigate(`/search?${searchParams.toString()}`);
    setSearchQuery('');
    setSelectedCategories([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="search-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
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
                  />
                }
                label={category.charAt(0).toUpperCase() + category.slice(1)}
              />
            ))}
          </FormGroup>

          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            Buscar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SearchModal;
