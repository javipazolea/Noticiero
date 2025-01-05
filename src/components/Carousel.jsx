import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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
              backgroundColor: "#000", // Fondo negro para evitar espacios vacíos
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
                  backgroundColor: "rgba(0,0,0,0.3)", // Overlay oscuro
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
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                padding: "20px 40px",
                borderRadius: "8px",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
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
                color="primary"
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
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
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
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
            transform: "translateY(-50%) scale(1.1)",
          },
          transition: "all 0.2s",
          zIndex: 3,
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 3,
        }}
      >
        {categories.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "#1976d2" : "#fff",
              transition: "background-color 0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
              },
              transition: "all 0.2s",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
