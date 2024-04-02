import { Formik, Form, Field, FieldProps } from "formik";
import { validationSchema } from "../../scripts/validationSchemaCreateUser";
import axios from "axios";
import { CREATE_USER } from "../../endpoints/endpoints";
import {
  formFieldItemType as Type,
  formCreateUserContent as content,
} from "../../assets/content/formCreateUser";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type FormCreateUserProps = {
  setFormOpen: (isOpen: boolean) => void;
};

export const FormCreateUser: React.FC<FormCreateUserProps> = ({
  setFormOpen,
}) => {
  // ------------------------------ Handler Create New User ------------------------------
  const handlerCreateNewUser = async (
    firstName: string,
    lastName: string,
    loginUser: string,
    password: string,
    email: string,
    telephone: string
  ) => {
    try {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        login: loginUser,
        password: password,
        email: email,
        telephone: telephone,
        isAdmin: true,
        mainUser: false,
      };

      const token = localStorage.getItem("token") || null;
      const setAuthToken = (token: string | null) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      };
      setAuthToken(token);

      axios
        .post(CREATE_USER, newUser)
        .then((loginResult) => {
          console.log(loginResult);
          setFormOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Помилка при вході:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 0px 50px",
        "@media screen and (min-width: 768px)": {
          padding: "50px 0px 50px",
        },
      }}
    >
      <Typography component="p">Create manager</Typography>
      <Formik
        initialValues={{
          firstNameUser: "",
          lastNameUser: "",
          loginUser: "",
          passwordUser: "",
          emailUser: "",
          phoneUser: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handlerCreateNewUser(
            values.firstNameUser,
            values.lastNameUser,
            values.loginUser,
            values.passwordUser,
            values.emailUser,
            values.phoneUser
          );
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Box
            component={Form}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              // height: "500px",
              paddingTop: "5px",
            }}
          >
            {content.map((i: Type) => (
              <Field name={i.fieldName} key={i.fieldName}>
                {({ field, meta }: FieldProps) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                    error={meta.touched && Boolean(meta.error)}
                    label={i.fieldLabel}
                    id={i.fieldName}
                    type={i.fieldType}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                    size="small"
                    sx={{
                      marginTop: "20px",
                    }}
                  />
                )}
              </Field>
            ))}

            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="primary"
              sx={{
                marginTop: "20px",
              }}
            >
              Add
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default FormCreateUser;
