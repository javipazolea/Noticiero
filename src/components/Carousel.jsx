import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";

import businessImg from "../assets/image/business.jpg";
import entertainmentImg from "../assets/image/entertainment.jpg";
import healthImg from "../assets/image/health.jpg";
import scienceImg from "../assets/image/science.jpg";
import sportsImg from "../assets/image/sports.jpg";
import technologyImg from "../assets/image/technology.jpg";

const categories = [
  { label: "Business", image: businessImg },
  { label: "Entertainment", image: entertainmentImg },
  { label: "Health", image: healthImg },
  { label: "Science", image: scienceImg },
  { label: "Sports", image: sportsImg },
  { label: "Technology", image: technologyImg },
];

const Carousel = () => {
  const { theme } = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCategoryClick = (category) => {
    navigate(`/categorias/${category.toLowerCase()}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "90%",
        height: 560,
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
      }}
    >
      <Box
        sx={{
          display: "flex",
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          height: "100%",
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              minWidth: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme === "light" ? "#fff" : "#000",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    theme === "light"
                      ? "rgba(0,0,0,0.1)"
                      : "rgba(255,255,255,0.1)",
                  zIndex: 1,
                },
              }}
            >
              <img
                src={category.image}
                alt={category.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                color: theme === "light" ? "#000" : "#fff",
                padding: "20px 40px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor:
                  theme === "light"
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.7)",
                backdropFilter: "blur(5px)",
              }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {category.label}
              </h3>
              <Button
                variant="contained"
                color={theme === "light" ? "primary" : "secondary"}
                onClick={() => handleCategoryClick(category.label)}
                size="large"
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  },
                }}
              >
                Go to {category.label}
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: theme === "light" ? "#fff" : "#000",
          "&:hover": {
            backgroundColor:
              theme === "light" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.2s",
          zIndex: 3,
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: theme === "light" ? "#fff" : "#000",
          "&:hover": {
            backgroundColor:
              theme === "light" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.2s",
          zIndex: 3,
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default Carousel;
