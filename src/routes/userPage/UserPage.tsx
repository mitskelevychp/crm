import { useState, useEffect } from "react";
import DocumentTitle from "../DocumentTitle";
import Headline from "./Headline";
import FormCreateUser from "../../components/forms/FormCreateUser";
import FormCreateCompany from "../../components/forms/FormCreateCompany";
import CompaniesList from "../../components/companiesList/ConpaniesList";
import axios, { AxiosError } from "axios";
import { GET_USER } from "../../endpoints/endpoints";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Search from "../../components/search/Serch";
import Button from "@mui/material/Button";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
  _id: string;
};

const UserPage: React.FC = () => {
  const [isFormCreateUserOpen, setFormCreateUserOpen] =
    useState<boolean>(false);
  const [isFormCreateCompanyOpen, setFormCreateCompanyOpen] =
    useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const token: string | null = localStorage.getItem("token");

  // ------------------------------ Authorization ------------------------------
  useEffect(() => {
    const getUserStatus = async () => {
      const setAuthToken = (token: string | null) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      };
      setAuthToken(token);

      try {
        const response = await axios.get(GET_USER);
        setUser(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          window.location.reload();
          console.error("Помилка при отриманні даних:", err.response?.data);
        } else {
          console.error("An unexpected error occurred", err);
        }
      }
    };

    getUserStatus();
  }, [token]);

  const createCompanyButtonToggle = () => {
    setFormCreateCompanyOpen((prev) => !prev);
    setFormCreateUserOpen(false);
  };
  const createUserButtonToggle = () => {
    setFormCreateUserOpen((prev) => !prev);
    setFormCreateCompanyOpen(false);
  };

  return (
    <>
      <DocumentTitle
        title={user?.mainUser ? "CRM: Admin page" : "CRM: Manager page"}
      />
      <Container
        component="main"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Headline user={user} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "30px 0px 20px",
            flexDirection: "column",
            rowGap: "20px",
            "@media screen and (min-width: 768px)": {
              flexDirection: "row",
              rowGap: "0px"
            }
          }}
        >
          <Search user={user} />
          <Box sx={{
            display: "flex",
            columnGap: "10px"
          }}>
            <Button
              variant="contained"
              type="button"
              color="primary"
              onClick={() => createCompanyButtonToggle()}
            >
              {isFormCreateCompanyOpen ? "Close Form" : "+ Company"}
            </Button>
            {user?.mainUser && (
              <Button
                variant="contained"
                type="button"
                color="primary"
                onClick={() => createUserButtonToggle()}
              >
                {isFormCreateUserOpen ? "Close Form" : "+ Manager"}
              </Button>
            )}
          </Box>
        </Box>
        {/* ---------------------------- Forms ---------------------------- */}
        {/* - FORM - 1 - */}
        {user?.mainUser && isFormCreateUserOpen ? (
          <FormCreateUser setFormOpen={setFormCreateUserOpen} />
        ) : null}
        {/* - FORM - 2 - */}
        {isFormCreateCompanyOpen ? (
          <FormCreateCompany setFormOpen={setFormCreateCompanyOpen} />
        ) : null}
        {/* ------------------------- Company list ------------------------- */}
        <CompaniesList user={user} />
      </Container>
    </>
  );
};

export default UserPage;
