import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Switch } from "@mui/material";
import {
  Search,
  Settings,
  Favorite,
  Login,
  Logout,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import SearchModal from "../modal/SearchModal";
import { UserContext } from "../../context/UserContext";

import logoClaro from "../../assets/image/logotemaclaro.png";
import logoOscuro from "../../assets/image/logotemaoscuro.png";
import "./navbar.css";

const Navbar = () => {
  const { user, logout, theme, setTheme } = useContext(UserContext);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme === "light" ? "white" : "black",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              minWidth: "100px",
            }}
          >
            <img
              src={theme === "light" ? logoClaro : logoOscuro}
              alt="UpNews Logo"
              className="navbar-logo"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "right",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            {/* Switch para cambiar el tema */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: theme === "light" ? "primary" : "secondary" }}
              >
                {theme === "light" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Switch
                checked={theme === "dark"}
                onChange={handleThemeChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>

            {/* Icono de búsqueda */}
            <IconButton
              color={theme === "light" ? "primary" : "secondary"}
              size="large"
              onClick={() => setSearchModalOpen(true)}
            >
              <Search />
            </IconButton>

            {user && (
              <>
                <IconButton
                  component={Link}
                  to="/settings"
                  color={theme === "light" ? "primary" : "secondary"}
                  size="large"
                >
                  <Settings />
                </IconButton>

                <IconButton
                  component={Link}
                  to="/favorites"
                  color={theme === "light" ? "primary" : "secondary"}
                  size="large"
                >
                  <Favorite />
                </IconButton>
              </>
            )}
          </Box>

          <IconButton
            color={theme === "light" ? "primary" : "secondary"}
            size="large"
            onClick={handleAuth}
            sx={{ minWidth: "100px" }}
          >
            {user ? <Logout /> : <Login />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <SearchModal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
