import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Grid, Typography, Button, IconButton } from "@mui/material";
import one from "../../assets/Images/4.jpg";
import two from "../../assets/Images/5.jpg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: 6,
    paddingTop: 6,
    marginTop: "20px",
    marginBottom: "20px",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
    paddingLeft: 5,
    paddingTop: 5,
    minHeight: 400,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    margin: "20px",
  },
  image2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: "5px solid white",
  },
  iconButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    // backgroundColor: ,
  },
}));

const AboutSection = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xxl" className={classes.container}>
      <Grid container spacing={5} sx={{ p: { xs: 3, sm: 5 } }}>
        <Grid item xs={12} lg={6} className="wow fadeInUp">
          <div className={classes.imageContainer}>
            <img src={one} alt="" className={classes.image} />
            <img
              src={two}
              alt=""
              className={`${classes.image2} position-absolute top-0 start-0 bg-white`}
              style={{ width: 200, height: 200 }}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6} className="wow fadeInUp">
          <div>
            <Typography
              variant="overline"
              sx={{ fontWeight: "bolder" }}
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="h6" gutterBottom>
              We Help Students To Pass Test & Get A License On The First Try
            </Typography>
            <Typography paragraph>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </Typography>
            <Typography paragraph>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </Typography>
            <Grid container spacing={2} className="mb-4 pb-2">
              <Grid
                item
                xs={6}
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "green" }} />
                <Typography variant="overline" sx={{ p: 1 }}>
                  Fully Licensed
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "green" }} />
                <Typography variant="overline" sx={{ p: 1 }}>
                  Online Tracking
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "green" }} />
                <Typography variant="overline" sx={{ p: 1 }}>
                  Afordable Fee
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "green" }} />
                <Typography variant="overline" sx={{ p: 1 }}>
                  Best Trainers
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutSection;
