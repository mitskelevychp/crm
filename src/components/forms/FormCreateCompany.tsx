// import { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { validationSchema } from "../../scripts/validationSchemaCreateCompany";
import axios from "axios";
import { CREATE_COMPANY } from "../../endpoints/endpoints";
import {
  formFieldItemType as Type,
  formCreateUserContent as content,
} from "../../assets/content/formCreateCompany";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import DateComponent from "./DateComponent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type FormCreateUserProps = {
  setFormOpen: (isOpen: boolean) => void;
};

// function generateIdWithTimestamp() {
//   return Date.now().toString();
// }

const FormCreateCompany: React.FC<FormCreateUserProps> = ({ setFormOpen }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // const [date, setDate] = useState<string>("");
  function generateUniqueId() {
    return Date.now().toString();
  }
  // const uniqueId = generateUniqueId();
  // ------------------------------ Handler Create New User ------------------------------
  const handlerCreateNewUser = async (
    nameCompany: string,
    // contactNameCompany: string,
    // contactEmailCompany: string,
    // contactPhoneCompany: string,
    // contactPositionCompany: string,
    site: string,
    // quantityVacanciesSite: string,
    linkLinkedIn: string
    // quantityVacanciesLinkedIn: string
  ) => {
    const loginUser: string | null = localStorage.getItem("userLogin") || null;
    const uniqueId = generateUniqueId();
    try {
      const newCompany = {
        enabled: "true",
        name: nameCompany,
        // name: nameCompany.charAt(0).toUpperCase() + nameCompany.slice(1),
        //
        // contactName: contactNameCompany,
        // contactEmail: contactEmailCompany,
        // contactPhone: contactPhoneCompany,
        // contactPosition: contactPositionCompany,
        // quantityVacanciesSite: quantityVacanciesSite,
        // linkLinkedIn: linkLinkedIn,
        // quantityVacanciesLinkedIn: quantityVacanciesLinkedIn,
        contactName: "-",
        contactEmail: "-",
        contactPhone: "-",
        contactPosition: "-",
        quantityVacanciesSite: "-",
        quantityVacanciesLinkedIn: "-",
        status: "open",
        categories: loginUser,
        imageUrls: ["img/products/men/001.png"],
        currentPrice: 1,
        quantity: 1,
        id: uniqueId,
        // dateCreate: date,
        site: site,
        linkLinkedIn: linkLinkedIn,
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
        .post(CREATE_COMPANY, newCompany)
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

  // const handleChange = (event: SelectChangeEvent) => {
  //   setstatus(event.target.value as string);
  // };

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
      <Typography component="p">Create Company</Typography>
      <Formik
        initialValues={{
          nameCompany: "",
          // contactNameCompany: "",
          // contactEmailCompany: "",
          // contactPhoneCompany: "",
          // contactPositionCompany: "",
          site: "",
          // quantityVacanciesSite: "",
          linkLinkedIn: "",
          // quantityVacanciesLinkedIn: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // TODO don't work
          const formattedNameCompany =
            values.nameCompany.charAt(0).toUpperCase() +
            values.nameCompany.slice(1);

          handlerCreateNewUser(
            formattedNameCompany,
            // values.nameCompany,
            //
            // values.contactNameCompany,
            // values.contactEmailCompany,
            // values.contactPhoneCompany,
            // values.contactPositionCompany,
            values.site,
            // values.quantityVacanciesSite,
            values.linkLinkedIn
            // values.quantityVacanciesLinkedIn
          );
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Box
            component={Form}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              // height: "250px",
              paddingTop: "25px",
              "@media screen and (min-width: 768px)": {
                width: "700px",
              },
            }}
          >
            {/* <DateComponent setDate={setDate} /> */}
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
                    size="medium"
                    variant={i.variant}
                    // multiline={i.multiline}
                    fullWidth={isSmallScreen ? false : i.fullWidth}
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

export default FormCreateCompany;
