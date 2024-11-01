import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import zero from "../../assets/Images/0.jpg";
import one from "../../assets/Images/7.jpg";
import two from "../../assets/Images/02.jpg";
import three from "../../assets/Images/03.jpg";
import four from "../../assets/Images/03.jpg";
import { Typography } from "@mui/material";

export default function ImageSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the speed in milliseconds (3000ms = 3s)
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      <Box
        sx={{
          width: "100%",
          height: { xs: "40vh", sm: "80vh" },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${one})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00000061",
            width: "100%",
            height: { xs: "40vh", sm: "80vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            component="h2"
            sx={{ fontSize: "1.3rem", color: "white" }}
          >
            Build Your Career
          </Typography>
          <Typography
            variant="overline"
            component="caption"
            sx={{ color: "white", maxWidth: "80%", textAlign: "center" }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique,
            iste.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { xs: "40vh", sm: "80vh" },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${two})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00000061",
            width: "100%",
            height: { xs: "40vh", sm: "80vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            component="h2"
            sx={{ fontSize: "1.3rem", color: "white" }}
          >
            Build Your Career
          </Typography>
          <Typography
            variant="overline"
            component="caption"
            sx={{ color: "white", maxWidth: "80%", textAlign: "center" }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique,
            iste.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { xs: "40vh", sm: "80vh" },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${three})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00000061",
            width: "100%",
            height: { xs: "40vh", sm: "80vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            component="h2"
            sx={{ fontSize: "1.3rem", color: "white" }}
          >
            Build Your Career
          </Typography>
          <Typography
            variant="overline"
            component="caption"
            sx={{ color: "white", maxWidth: "80%", textAlign: "center" }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique,
            iste.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { xs: "40vh", sm: "80vh" },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${zero})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00000061",
            width: "100%",
            height: { xs: "40vh", sm: "80vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            component="h2"
            sx={{ fontSize: "1.3rem", color: "white" }}
          >
            Build Your Career
          </Typography>
          <Typography
            variant="overline"
            component="caption"
            sx={{ color: "white", maxWidth: "80%", textAlign: "center" }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique,
            iste.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { xs: "40vh", sm: "80vh" },
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${four})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#00000061",
            width: "100%",
            height: { xs: "40vh", sm: "80vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="overline"
            component="h2"
            sx={{ fontSize: "1.3rem", color: "white" }}
          >
            Build Your Career
          </Typography>
          <Typography
            variant="overline"
            component="caption"
            sx={{ color: "white", maxWidth: "80%", textAlign: "center" }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique,
            iste.
          </Typography>
        </Box>
      </Box>
    </Slider>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "10px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "10px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}
