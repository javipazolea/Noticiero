import { Pagination as MuiPagination, Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Asegúrate de que la ruta sea correcta
import { useLoading } from "../../context/LoadingContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useContext(UserContext); // Accede al contexto para obtener el tema
  const { setIsLoading } = useLoading();

  if (totalPages === 0 || currentPage > totalPages || currentPage < 1) {
    return null;
  }

  const handleChange = async (_, page) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
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
        color={theme === "light" ? "primary" : "secondary"}
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
