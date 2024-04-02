import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { Formik, Form, Field, FieldProps } from "formik";
import { object, string } from "yup";
import axios from "axios";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GET_USER } from "../../endpoints/endpoints";
import "./LogIn.css";

const LogIn: React.FC = () => {
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  // const theme = useTheme();
  const validationSchema = object().shape({
    login: string()
      .required("Incorrect entry")
      .min(4, "Incorrect entry (> 4 char.) ")
      .max(16, "Incorrect entry (< 16 char)"),
    password: string()
      .required("Incorrect entry")
      .min(6, "Incorrect entry (6-30 char.")
      .max(30, "Incorrect entry (7-30 char.")
      .matches(/[a-zA-Z0-9]/, "Incorrect entry (a-z, A-Z, 0-9)"),
  });

  const handleUserLogin = async (login: string, password: string) => {
    try {
      const userData = {
        loginOrEmail: login,
        password: password,
      };

      axios
        // .post("http://localhost:4000/api/customers/login", userData)
        .post(
          "https://crm-portfolio-server.vercel.app/api/customers/login",
          userData
        )
        .then((loginResult) => {
          const { token } = loginResult.data;

          const setAuthToken = (token: string) => {
            if (token) {
              axios.defaults.headers.common["Authorization"] = token;
            } else {
              delete axios.defaults.headers.common["Authorization"];
            }
          };
          setAuthToken(token);
          async function getCustomer() {
            try {
              const response = await axios.get(GET_USER);
              navigate("/user");
              localStorage.setItem("userLogin", response.data.login);
              localStorage.setItem("isAdmin", response.data.isAdmin);
              localStorage.setItem("token", token);
              return response.data;
            } catch (err) {
              console.error("Помилка при отриманні даних:", err);
              return null;
            }
          }
          getCustomer();
        })
        .catch((err) => {
          setShowError(true);
          console.error("Помилка при вході:", err);
        });
    } catch (error) {
      setShowError(true);
      console.error("Помилка при вході:", error);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>Log-In</p>
      <Formik
        initialValues={{ login: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          handleUserLogin(values.login, values.password);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Box
            component={Form}
            className="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              rowGap: "10px",
              // height: "210px",
            }}
          >
            <Field name="login" placeholder="login">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  label="Login"
                  id="login"
                  type="text"
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="password" placeholder="password">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  error={meta.touched && Boolean(meta.error)}
                  id="password"
                  // label={meta.touched && meta.error ? meta.error : "Password"}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  label="Password"
                  type="text"
                />
              )}
            </Field>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="primary"
            >
              Enter
            </Button>
            {showError && (
              <p className={showError && "textAttention"}>Incorrect entry</p>
            )}
            {/* <Box component="div" className="errorsWrapper">
              <ErrorMessage
                name="login"
                component="p"
                className="textAttention"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="textAttention"
              />
            </Box> */}
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default LogIn;
