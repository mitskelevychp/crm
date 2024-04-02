import DocumentTitle from "../DocumentTitle";
import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./HomePage.css";

type HomePageType = {
  isLoggedIn: string | null;
};

const HomePage: React.FC<HomePageType> = ({ isLoggedIn }) => {
  return (
    <>
      {/* <header></header> */}
      <DocumentTitle title="Alite Recruiting CRM" />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // paddingTop: "200px",
          minHeight: "calc(100vh - 107px)",
        }}
        component="main"
      >
        <Link to={isLoggedIn ? "/user" : "/log-in"} className="headline">
          <Typography
            component="p"
            sx={{
              fontSize: {
                xs: "28px",
                sm: "30px",
              },
              fontWeight: "700",
              background: "linear-gradient(to right, #184d93, #7c7e7d)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              display: "inline",
            }}
          >
            Alite Recruiting
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: {
                xs: "40px",
                sm: "50px",
                md: "80px",
              },
              fontWeight: "700",
              background:
                "linear-gradient(90deg, #686868 25%, #00b2d0 50%, #686868 75%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "waveAnimation 5s linear infinite",
              backgroundSize: "200% 100%",
            }}
          >
            CRM
          </Typography>
        </Link>
      </Container>
      {/* <footer></footer> */}
    </>
  );
};

export default HomePage;
