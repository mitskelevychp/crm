import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        // marginTop: "100px",
        // paddingTop: "15px",
        // height: "50px",
        background: "linear-gradient(to right, #184d93, #7c7e7d)",
        // color: "#FFFFFF",
        // display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
      }}
    >
      <Container
        component="footer"
        sx={{
          // marginTop: "100px",
          // paddingTop: "15px",
          height: "50px",
          // background: "linear-gradient(to right, #184d93, #7c7e7d)",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      />
    </Box>
  );
};

export default Footer;
