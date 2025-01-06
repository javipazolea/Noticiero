import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const NewsModal = ({ article, closeModal }) => {
  const { theme } = useContext(UserContext);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor:
          theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: theme === "light" ? "#fff" : "#1a1a1a",
          color: theme === "light" ? "#000" : "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "20px",
          maxWidth: "500px",
          width: "90%",
          textAlign: "center",
          position: "relative",
        }}
      >
        <button
          onClick={closeModal}
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
        <img
          src={article.urlToImage || "/assets/image/default.jpg"}
          alt={article.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />
        <h2 style={{ marginBottom: "10px", fontSize: "1.5rem" }}>
          {article.title}
        </h2>
        <p style={{ marginBottom: "10px", fontSize: "0.9rem", opacity: 0.8 }}>
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        <p style={{ marginBottom: "20px" }}>
          {article.description || "Sin descripción disponible."}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: theme === "light" ? "#1976d2" : "#90caf9",
            color: theme === "light" ? "#fff" : "#000",
            transition: "background-color 0.3s",
          }}
        >
          Leer más
        </a>
      </div>
    </div>
  );
};

export default NewsModal;
