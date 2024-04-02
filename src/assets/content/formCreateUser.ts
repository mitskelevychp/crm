export type formFieldItemType = {
  fieldName: string;
  fieldType: string;
  fieldLabel: string;
};

export type formFieldErrorType = {
  fieldErrorName: string;
};

export const formCreateUserContent: formFieldItemType[] = [
  {
    fieldName: "firstNameUser",
    fieldType: "text",
    fieldLabel: "First Name",
  },
  {
    fieldName: "lastNameUser",
    fieldType: "text",
    fieldLabel: "Last Name",
  },
  {
    fieldName: "loginUser",
    fieldType: "text",
    fieldLabel: "Login",
  },
  {
    fieldName: "passwordUser",
    fieldType: "text",
    fieldLabel: "Password",
  },
  {
    fieldName: "emailUser",
    fieldType: "email",
    fieldLabel: "Email",
  },
  {
    fieldName: "phoneUser",
    fieldType: "tel",
    fieldLabel: "Telephone",
  },
];

// export const formCreateUserErrorContent: formFieldErrorType[] = [
//   {
//     fieldErrorName: "firstNameUser",
//   },
//   {
//     fieldErrorName: "lastNameUser",
//   },
//   {
//     fieldErrorName: "loginUser",
//   },
//   {
//     fieldErrorName: "passwordUser",
//   },
//   {
//     fieldErrorName: "emailUser",
//   },
// ];
