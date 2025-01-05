import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import Pagination from "../../components/paginacion/Pagination";
import { useLoading } from "../../context/LoadingContext";

const PaginaCategoria = () => {
  const { categoria } = useParams();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { setIsLoading } = useLoading();
  const articlesPerPage = 6;

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setIsLoading(true);
      try {
        const apiKey = "11b465cd6c684f83a7886695c2211daf";
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${categoria}&apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const filteredArticles = data.articles.filter(
          (article) =>
            article.title !== "Removed" &&
            article.urlToImage &&
            article.urlToImage.startsWith("http")
        );
        setArticles(filteredArticles);
        setError(null);
      } catch (err) {
        setError(err.message);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryNews();
  }, [categoria, setIsLoading]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div>
      <h1>
        Noticias de {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
      </h1>
      {error ? (
        <p style={{ color: "red" }}>Error loading news: {error}</p>
      ) : (
        <>
          <Cards articles={displayedArticles} />
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

export default PaginaCategoria;
