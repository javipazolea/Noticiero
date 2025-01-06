import { createContext, useState, useEffect, useCallback } from "react";
import { useLoading } from "./LoadingContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("User");
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const { setIsLoading } = useLoading();

  // Cargar configuraciones iniciales
  useEffect(() => {
    const loadInitialSettings = () => {
      const savedUser = localStorage.getItem("user");
      const savedFavorites = localStorage.getItem("favorites");

      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setUsername(userData.username || "User");
      }

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    loadInitialSettings();
  }, []);

  // Guardar configuraciones cuando cambien
  useEffect(() => {
    if (user) {
      const updatedUser = {
        ...user,
        theme,
        username,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    localStorage.setItem("theme", theme);
  }, [theme, username, user]);

  // Funciones de autenticación
  const login = useCallback(
    (userData) => {
      const enhancedUserData = {
        ...userData,
        theme,
      };
      localStorage.setItem("user", JSON.stringify(enhancedUserData));
      setUser(enhancedUserData);
      setUsername(userData.username || userData.name || "User");

      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    },
    [theme]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    setFavorites([]);
  }, []);

  // Gestión de contraseña
  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      if (!user) return false;

      // Verificar la contraseña actual en los usuarios almacenados
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(
        (u) => u.email === user.email && u.password === currentPassword
      );

      if (userIndex === -1) return false;

      // Actualizar
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      const updatedUser = { ...user, password: newPassword };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return true;
    },
    [user]
  );

  // Gestión de perfil
  const updateProfile = useCallback(
    (profileData) => {
      if (!user) return false;

      try {
        const updatedUser = {
          ...user,
          ...profileData,
        };

        //users array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex((u) => u.email === user.email);
        if (userIndex !== -1) {
          users[userIndex] = {
            ...users[userIndex],
            ...profileData,
          };
          localStorage.setItem("users", JSON.stringify(users));
        }

        //usuario actual
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        if (profileData.username) setUsername(profileData.username);
        return true;
      } catch (error) {
        console.error("Error updating profile:", error);
        return false;
      }
    },
    [user]
  );

  // Gestión de favoritos
  const addToFavorites = useCallback(
    (article) => {
      if (!user) return;

      setFavorites((prevFavorites) => {
        const isDuplicate = prevFavorites.some(
          (fav) => fav.title === article.title
        );
        if (isDuplicate) return prevFavorites;

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

  // Función para obtener noticias
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
    user,
    username,
    setUsername,
    login,
    logout,
    changePassword,
    updateProfile,
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
