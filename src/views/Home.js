import * as React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Box,
  Paper,
  Typography,
} from "@mui/material";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Logo } from "./Logo";

const images = [
  {
    file: "1.jpg",
    description: `A custom addition meticulously crafted to perfectly 
                  match the dimensions of the Mustang emblem`,
  },
  {
    file: "2.jpg",
    description: `Enhanced grip 3D-printed replacement lever designed 
                  for the American Flyer 26760 Remote Control Switch. 
                  This elongated lever offers improved functionality 
                  compared to the original.`,
  },
];

const CreateQuoteContact = (contact) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        bgcolor: "icon.primary",
        color: "background.paper",
        justifyContent: "center",
        width: "280px",
        padding: "10px",
      }}
    >
      {contact}
    </Paper>
  );
};

const CreateQuoteMotto = (icon, contentTitle, content) => {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        maxWidth: 410,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {contentTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIcon
      className={className}
      style={{
        ...style,
        left: 0,
        display: "block",
        padding: "15px",
        backgroundColor: "#4A91BF",
        color: "white",
        borderRadius: "50%",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIcon
      className={className}
      style={{
        ...style,
        right: 0,
        display: "block",
        padding: "15px",
        backgroundColor: "#4A91BF",
        color: "white",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const createGallery = () => {
  return images.map((image, index) => (
    <Box key={index}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          elevation={0}
          sx={{
            maxWidth: 345,
            mx: "15px",
          }}
        >
          <CardMedia
            component="img"
            height="345"
            image={`./img/${image.file}`}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {image.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  ));
};

export const Home = () => {
  const settings = {
    dots: false,
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const mobileSettings = {
    ...settings,
    slidesToShow: 1,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      {/* Explain what services is provided */}

      <Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Logo variant={"div"} fontSize={"3.5rem"} />
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
          }}
        >
          <Logo variant={"div"} fontSize={"2.0rem"} />
        </Box>

        <Typography
          variant="h5"
          component="div"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          Product Design | Prototyping | 3D Printing
        </Typography>

        <Typography
          variant="h7"
          component="div"
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
          }}
        >
          Product Design | Prototyping | 3D Printing
        </Typography>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center", md: "right" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteContact("Call or Text: (651) 357-6817")}
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            justifyContent={{ xs: "center", md: "left" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteContact("Email: idealabs360@gmail.com")}
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ display: { xs: "block", md: "none" } }}>
        <Slider {...mobileSettings}>{createGallery()}</Slider>
      </Container>

      <Container maxWidth="md" sx={{ display: { xs: "none", md: "block" } }}>
        <Slider {...settings}>{createGallery()}</Slider>
      </Container>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteMotto(
              <AttachMoneyOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />,
              "Fair Price",
              `We believe everyone should have access to high-quality
               products at a fair price. Experience the perfect balance of
               affordability and excellence with us. Shop today and see the
               difference that reasonable pricing can make in elevating your
               overall buying experience.`
            )}
          </Grid>

          <Grid
            xs={12}
            md={6}
            justifyContent={{ xs: "center" }}
            sx={{ display: "flex" }}
          >
            {CreateQuoteMotto(
              <ElectricBoltOutlinedIcon
                sx={{
                  color: "icon.primary",
                  fontSize: "4rem",
                }}
              />,
              "Fast & Open Communication",
              `Experience the difference of working with a company that
               values speed, efficiency, and client satisfaction above all
               else. Choose us for your 3D printing prototype design needs,
               and you'll witness the power of a "Fast Response" in action.
               Let's turn your ideas into reality quickly and effectively -
               together.`
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};