import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import pdf from "../../assets/Images/pdf.jpg";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
export default function MaterialPost({ data, loading }) {
  return (
    <Link
      target="_blank"
      to={`http://localhost:7000/uploads/materials/${data?.material}`}
      style={{ textDecoration: "none" }}
    >
      <Card elevation={4}>
        {loading ? (
          <Skeleton variant="rectangular" width={"100%"} height={240} />
        ) : (
          <CardMedia sx={{ height: 240 }} image={pdf} title={data?.title} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {loading ? <Skeleton width={"100%"} /> : data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {loading ? <Skeleton width="60%" /> : data?.caption}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
