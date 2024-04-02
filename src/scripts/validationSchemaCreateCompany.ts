import { object, string } from "yup";

export const validationSchema = object().shape({
  nameCompany: string()
    .required("Incorrect entry")
    .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Incorrect entry (a-z, A-Z, а-я, А-Я)")
    .min(2, "Incorrect entry, 2 - 25 char.")
    .max(25, "Incorrect entry, 2 - 25 char."),
  site: string()
    .required("Incorrect entry")
    .matches(/http/, "Incorrect entry (start with http or https)"),
  linkLinkedIn: string()
    .required("Incorrect entry")
    .matches(
      /https:\/\/www.linkedin.com/,
      "Incorrect entry (must be link to LinkedIn)"
    ),
  // contactNameCompany: string()
  //   .required("Incorrect entry")
  //   .matches(/[a-zA-Zа-яА-ЯіІїЇ'єЄ]/, "Incorrect entry (a-z, A-Z, а-я, А-Я)")
  //   .min(2, "Incorrect entry, 2 - 25 char.")
  //   .max(25, "Incorrect entry, 2 - 25 char."),
  // contactEmailCompany: string().email("Incorrect entry"),
  // phoneUser: string().matches(
  //   /\+380\d{3}\d{2}\d{2}\d{2}/,
  //   "Incorrect entry (+380...)"
  // ),
});
