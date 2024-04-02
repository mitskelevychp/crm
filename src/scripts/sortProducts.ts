type CompanyType = {
  itemNo: string;
  name: string;
  site: string;
  linkLinkedIn: string;
  categories: string;
  contactName: string;
  contactEmail: string;
  contactPosition: string;
  status: string;
  dateCreate: string;
  quantityVacanciesSite: string;
  quantityVacanciesLinkedIn: string;
  _id: string;
  contactPhone: string;
};

export default CompanyType;

// export const doSorting = (companies: CompanyType[], type: string) => {
//   const locale = "en";
//   switch (type) {
//     case "alphabetAsc":
//       return [...companies].sort((a, b) =>
//         a.name.localeCompare(b.name, locale)
//       );
//     case "alphabetDesc":
//       return [...companies].sort((a, b) =>
//         b.name.localeCompare(a.name, locale)
//       );
//     case "statusOpen":
//       return [...companies].sort((a, b) => {
//         if (a.status === "open" && b.status !== "open") {
//           return -1;
//         } else if (a.status !== "open" && b.status === "open") {
//           return 1;
//         }
//         return 0;
//       });

//     case "statusClosed":
//       return [...companies].sort((a, b) => {
//         if (a.status === "closed" && b.status !== "closed") {
//           return -1;
//         } else if (a.status !== "closed" && b.status === "closed") {
//           return 1;
//         }
//         return 0;
//       });
//     case "firstNew":
//       return [...companies].sort(
//         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//       );
//     case "firstOld":
//       return [...companies].sort(
//         (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//       );
//     default:
//       return companies;
//   }
// };
