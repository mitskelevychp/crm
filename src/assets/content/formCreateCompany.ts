import { TextFieldProps } from "@mui/material/TextField";

export type formFieldItemType = {
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
  variant: TextFieldProps["variant"];
  fullWidth: boolean;
};

export type formFieldErrorType = {
  fieldErrorName: string;
};

export const formCreateUserContent: formFieldItemType[] = [
  {
    fieldName: "nameCompany",
    fieldType: "text",
    fieldLabel: "Company Name",
    variant: "outlined",
    fullWidth: false,
  },
  // {
  //   fieldName: "contactNameCompany",
  //   fieldType: "text",
  //   fieldLabel: "Contact Name",
  // },
  // {
  //   fieldName: "contactEmailCompany",
  //   fieldType: "email",
  //   fieldLabel: "Contact Email",
  // },
  // {
  //   fieldName: "contactPhoneCompany",
  //   fieldType: "tel",
  //   fieldLabel: "Telephone",
  // },
  // {
  //   fieldName: "contactPositionCompany",
  //   fieldType: "text",
  //   fieldLabel: "Contact Position",
  // },
  {
    fieldName: "site",
    fieldType: "text",
    fieldLabel: "Site",
    variant: "standard",
    fullWidth: true,
  },
  // {
  //   fieldName: "quantityVacanciesSite",
  //   fieldType: "text",
  //   fieldLabel: "Quantity of Vacancies",
  // },
  {
    fieldName: "linkLinkedIn",
    fieldType: "text",
    fieldLabel: "Link to LinkedIn",
    variant: "standard",
    fullWidth: true,
  },
  // {
  //   fieldName: "quantityVacanciesLinkedIn",
  //   fieldType: "text",
  //   fieldLabel: "Quantity of Vacancies",
  // },
];
