import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";

type HeaderType = {
  isLoggedIn: string | null;
  doLogOut: () => void;
};

const Header: React.FC<HeaderType> = ({ isLoggedIn, doLogOut }) => {
  return (
    <Box
      sx={{
        // paddingTop: "15px",
        // paddingBottom: "15px",
        background: "linear-gradient(to right, #184d93, #7c7e7d)",
        // color: "#FFFFFF",
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
      }}
    >
      <Container
        component="header"
        sx={{
          paddingTop: "15px",
          paddingBottom: "15px",
          // background: "linear-gradient(to right, #184d93, #7c7e7d)",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            component="p"
            sx={{
              fontSize: "18px",
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#00b2d0",
              }}
            >
              &nbsp;CRM
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          to={isLoggedIn ? "/" : "/log-in"}
          component={Link}
          onClick={doLogOut}
        >
          <LogoutIcon />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
