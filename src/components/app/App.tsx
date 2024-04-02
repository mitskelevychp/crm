import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import theme from "../../styles/theme";
import "./App.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import doLogOut from "../../scripts/doLogOut";
import axios, { AxiosError } from "axios";
import { GET_USER } from "../../endpoints/endpoints";

type UserPageType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
  _id: string;
};

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState<string | null>(null);
  const [user, setUser] = useState<UserPageType | null>(null);
  function hendlerLoggedIn(nameUser: string | null) {
    setLoggedIn(nameUser);
  }
  const token: string | null = localStorage.getItem("token");

  useEffect(() => {
    const nameUser: string | null = localStorage.getItem("userLogin") || null;
    hendlerLoggedIn(nameUser);
  }, []);

  useEffect(() => {
    const getUserStatus = async () => {
      const setAuthToken = (token: string | null) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      };

      if (token !== null) {
        setAuthToken(token);
        setLoggedIn(token);
        try {
          const response = await axios.get(GET_USER);

          setUser(response.data);
        } catch (err) {
          if (err instanceof AxiosError) {
            // doLogOut(setLoggedIn);
            // window.location.reload();
            console.error("Помилка при отриманні даних:", err.response?.data);
          } else {
            console.error("An unexpected error occurred", err);
          }
        }
      }
    };

    getUserStatus();
  }, [token]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header
          isLoggedIn={isLoggedIn}
          doLogOut={() => doLogOut(setLoggedIn)}
        />
        <AppRoutes isLoggedIn={isLoggedIn} user={user} />
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
