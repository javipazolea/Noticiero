// UserContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { useLoading } from "./LoadingContext";
import defaultImage from "../assets/image/imagencards.jpg";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("User");
  const [country, setCountry] = useState("us");
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const { setIsLoading } = useLoading();

  // Cargar usuario y favoritos al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const login = useCallback((userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    // Cargar favoritos del usuario al hacer login
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    setFavorites([]); // Limpiar favoritos al hacer logout
  }, []);

  const addToFavorites = useCallback(
    (article) => {
      if (!user) return; // Solo usuarios autenticados pueden añadir favoritos

      setFavorites((prevFavorites) => {
        // Verificar si el artículo ya está en favoritos
        const isDuplicate = prevFavorites.some(
          (fav) => fav.title === article.title
        );
        if (isDuplicate) return prevFavorites;
        // Agregar timestamp al artículo
        const articleWithTimestamp = {
          ...article,
          addedAt: Date.now(),
        };

        const newFavorites = [...prevFavorites, articleWithTimestamp];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      });
    },
    [user]
  );

  const removeFromFavorites = useCallback((articleTitle) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (article) => article.title !== articleTitle
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isArticleFavorite = useCallback(
    (articleTitle) => {
      return favorites.some((article) => article.title === articleTitle);
    },
    [favorites]
  );

  const fetchNews = useCallback(
    async (url) => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

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
        console.error(err);
        setError(err.message);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const value = {
    theme,
    setTheme,
    username,
    setUsername,
    country,
    setCountry,
    user,
    login,
    logout,
    articles,
    error,
    fetchNews,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isArticleFavorite,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
