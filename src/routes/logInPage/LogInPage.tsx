import DocumentTitle from "../DocumentTitle";
import LogIn from "../../components/logIn/LogIn";
import Container from "@mui/material/Container";
import "./LogInPage.css";

const LogInPage: React.FC = () => {
  return (
    <>
      <header></header>
      <Container
        component="main"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // paddingTop: "250px",
          minHeight: "calc(100vh - 107px)",
        }}
      >
        <DocumentTitle title="CRM: Log-in" />
        <LogIn />
      </Container>
      <footer></footer>
    </>
  );
};

export default LogInPage;
