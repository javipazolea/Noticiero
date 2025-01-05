import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Pagination from "../components/paginacion/Pagination";

const NewsPage = () => {
  const { country, articles, error, fetchNews } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Cálculo del total de páginas
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    const apiKey = "11b465cd6c684f83a7886695c2211daf";
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    fetchNews(url);
  }, [country, fetchNews]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Artículos para la página actual
  const displayedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Carousel />
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

export default NewsPage;
