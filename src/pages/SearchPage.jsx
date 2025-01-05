import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards";
import Pagination from "../components/paginacion/Pagination";
import { UserContext } from "../context/UserContext";

const SearchPage = () => {
  const { fetchNews, articles, error } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q") || "";

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=11b465cd6c684f83a7886695c2211daf`;
    fetchNews(url);
  }, [location.search, fetchNews]);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Resultados de búsqueda</h1>
      {error ? (
        <p>Error al cargar noticias: {error}</p>
      ) : (
        <>
          <Cards articles={currentArticles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
