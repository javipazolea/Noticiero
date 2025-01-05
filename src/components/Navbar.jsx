import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react"; // Añadido useState
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Search, Settings, Favorite, Login, Logout } from "@mui/icons-material";
import SearchModal from "./modal/SearchModal";
import { UserContext } from "../context/UserContext";

import logo from "../assets/image/logo.jpg";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
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

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
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
              src={logo}
              alt="UpNews Logo"
              style={{
                height: "90px",
                width: "auto",
                marginLeft: "-23px",
              }}
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
            <IconButton
              color="primary"
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
                  color="primary"
                  size="large"
                >
                  <Settings />
                </IconButton>

                <IconButton
                  component={Link}
                  to="/favorites"
                  color="primary"
                  size="large"
                >
                  <Favorite />
                </IconButton>
              </>
            )}
          </Box>

          <IconButton
            color="primary"
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
