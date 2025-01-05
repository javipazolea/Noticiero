import { Pagination as MuiPagination, Box } from "@mui/material";
import { useLoading } from "../../context/LoadingContext"; // Ajusta la ruta según tu estructura

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { setIsLoading } = useLoading();

  if (totalPages === 0 || currentPage > totalPages || currentPage < 1) {
    return null;
  }

  const handleChange = async (_, page) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
      // Añadimos un delay artificial
      await new Promise((resolve) => setTimeout(resolve, 700));
      onPageChange(page);
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" py={3}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        aria-label="Paginación de noticias"
      />
    </Box>
  );
};

export default Pagination;
