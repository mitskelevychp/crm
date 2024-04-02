import { object, string } from "yup";

const validationSchema = object().shape({
  firstNameUser: string()
    .required("Incorrect entry")
    .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Incorrect entry (a-z, A-Z, а-я, А-Я)")
    .min(2, "Incorrect entry, 2 - 25 char.")
    .max(25, "Incorrect entry, 2 - 25 char."),
  lastNameUser: string()
    .required("Incorrect entry")
    .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Incorrect entry (a-z, A-Z, а-я, А-Я)")
    .min(2, "Incorrect entry, 2 - 25 char.")
    .max(25, "Incorrect entry, 2 - 25 char."),
  loginUser: string()
    .required("Incorrect entry")
    .matches(/[a-zA-Zа-яА-Я]/, "Incorrect entry (a-z, A-Z, 0-9)")
    .min(6, "Incorrect entry, 6 - 10 char.")
    .max(10, "Incorrect entry, 6 - 10 char."),
  emailUser: string().email("Incorrect entry"),
  passwordUser: string()
    .required("Incorrect entry")
    .min(7, "Incorrect entry, 7 - 30 char.")
    .max(30, "Incorrect entry, 7 - 30 char.")
    .matches(/[a-zA-Z0-9]/, "Incorrect entry (a-z, A-Z, 0-9)"),
  phoneUser: string().matches(
    /\+380\d{3}\d{2}\d{2}\d{2}/,
    "Incorrect entry (+380...)"
  ),
});

export { validationSchema };
