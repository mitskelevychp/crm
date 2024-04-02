import { useState, useEffect } from "react";
import axios from "axios";
import { CREATE_COMPANY, CREATE_COMMENT } from "../../endpoints/endpoints";
import CompanyType from "../../scripts/sortProducts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
  _id: string;
};
type CompaniesListProps = {
  user: UserType | null;
};
type CompanyMergeType = {
  _id: string;
  categories: string;
  // інші поля компанії
  dateNextContact?: string;
};
type CommentType = {
  product: {
    _id: string;
    // інші поля продукту/компанії всередині коментаря
  };
  dateNextContact: string;
  content: string;
  contactName: string;
  // інші поля коментаря
};
type CommentWithParsedDate = CommentType & {
  parsedDate: Date;
};

const CompaniesList: React.FC<CompaniesListProps> = ({ user }) => {
  const [list, setList] = useState<CompanyType[]>([]);
  const [listComments, setListComments] = useState<CommentType[]>([]);

  const columns: GridColDef[] = [
    // { field: "dateNextContact", headerName: "Contact date", width: 145 },
    {
      field: "dateNextContact",
      headerName: "Contact date",
      width: 145,
      renderCell: (params) => {
        return <p>{params.value !== null ? params.value : "No dates"}</p>;
      },
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 400,
      renderCell: (params) => {
        const commentsForCompany = listComments.filter(
          (comment) => comment.product._id === params.row._id
        );
        return commentsForCompany.length ? (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              // padding: "0px 10px",
            }}
          >
            {commentsForCompany.map((comment, index) => (
              <li
                key={index}
                style={{
                  padding: "5px",
                  margin: "2px",
                  border: "1px solid #f2f2f2",
                  backgroundColor: "#f2f7ff",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <span style={{ fontWeight: "700" }}>Next contact:&nbsp;</span>
                  {comment.dateNextContact}&nbsp;
                  <span style={{ fontWeight: "700" }}>with&nbsp;</span>
                  {comment.contactName}
                </p>
                <p>
                  <span style={{ fontWeight: "700" }}>About:&nbsp;</span>
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          "No comments"
        );
      },
    },
    {
      field: "date",
      headerName: "Create date",
      width: 130,
      renderCell: (params) => {
        // Перетворення ISO рядка дати на об'єкт Date
        const dateObj = new Date(params.value);
        // Форматування дати у бажаний вигляд
        const formattedDate = formatDateString(dateObj);
        return <p>{formattedDate}</p>;
      },
    },
    {
      field: "name",
      headerName: "Company",
      width: 200,
      renderCell: (params) => {
        return (
          // <Link to={`/companies/${params.row.itemNo}`} target="_blank">
          //   {params.value}
          // </Link>
          <Link to={`/companies/${params.row.itemNo}`}>
            <Box
              component="span"
              sx={{
                textTransform: "capitalize",
                ":hover": {
                  textDecoration: "underline",
                  color: "#00b1d0",
                },
              }}
            >
              {params.value}
            </Box>
            {/* <span style={{ textTransform: "capitalize" }}>{params.value}</span> */}
          </Link>
        );
      },
    },
    { field: "status", headerName: "Status", width: 110 },
    ...(user?.mainUser
      ? [{ field: "categories", headerName: "Manager", width: 120 }]
      : []),
  ];

  // TODO here
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const responseComments = await axios.get(CREATE_COMMENT);
        const comments = responseComments.data;
        const responseCompanyComments = await axios.get(
          `https://crm-portfolio-server.vercel.app/api/comments/`
        );
        setListComments(responseCompanyComments.data);
        // Поточна дата для порівняння
        const currentDate = new Date();

        if (user && !user.mainUser) {
          const responseCompanies = await axios.get(
            `https://crm-portfolio-server.vercel.app/api/products/filter?categories=${user?.login}`
          );
          const companies = responseCompanies.data.products;
          // TODO, replace it to a separete function. Here and below
          const updatedManagerCompanies = companies.map(
            (company: CompanyMergeType) => {
              // Знаходимо всі коментарі для даної компанії
              const companyComments = comments.filter(
                (comment: CommentType) =>
                  comment.product && comment.product._id === company._id
              );
              // Перетворюємо дати і відфільтровуємо ті, що пізніше поточної дати
              const filteredComments = companyComments
                .map((comment: CommentType) => ({
                  ...comment,
                  parsedDate: parseDateString(comment.dateNextContact),
                  // content: comment.content,
                }))
                .filter(
                  (comment: { parsedDate: Date }) =>
                    comment.parsedDate > currentDate
                );
              // Вибираємо коментар із найближчою датою
              const nearestComment = filteredComments.reduce(
                (
                  acc: CommentWithParsedDate | null,
                  comment: CommentWithParsedDate
                ) => {
                  return !acc || comment.parsedDate < acc.parsedDate
                    ? comment
                    : acc;
                },
                null
              );
              return {
                ...company,
                dateNextContact: nearestComment
                  ? formatDateString(nearestComment.parsedDate)
                  : null,
              };
            }
          );

          setList(updatedManagerCompanies);
        }
        if (user && user.mainUser) {
          const responseCompanies = await axios.get(CREATE_COMPANY);
          const companies = responseCompanies.data;
          // TODO, replace it to a separete function. Here and below
          const updatedCompanies = companies.map(
            (company: CompanyMergeType) => {
              const companyComments = comments.filter(
                (comment: CommentType) =>
                  comment.product && comment.product._id === company._id
              );
              const filteredComments = companyComments
                .map((comment: CommentType) => ({
                  ...comment,
                  parsedDate: parseDateString(comment.dateNextContact),
                }))
                .filter(
                  (comment: { parsedDate: Date }) =>
                    comment.parsedDate > currentDate
                );
              const nearestComment = filteredComments.reduce(
                (
                  acc: CommentWithParsedDate | null,
                  comment: CommentWithParsedDate
                ) => {
                  return !acc || comment.parsedDate < acc.parsedDate
                    ? comment
                    : acc;
                },
                null
              );
              return {
                ...company,
                dateNextContact: nearestComment
                  ? formatDateString(nearestComment.parsedDate)
                  : null,
              };
            }
          );

          setList(updatedCompanies);
        }
        // setList(companies);
      } catch (error) {
        console.error("Помилка при вході:", error);
      }
    };

    fetchCompanies();
  }, [user]);

  const Preloader = () => {
    return <Skeleton animation="wave" variant="rectangular" height="150px" />;
  };

  function parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  function formatDateString(date: Date): string {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <Box
      sx={{
        padding: "50px 0px 50px",
        "@media screen and (min-width: 768px)": {
          paddingBottom: "50px",
        },
      }}
    >
      <DataGrid
        slots={{
          noRowsOverlay: Preloader,
        }}
        // rowHeight={100}
        getRowHeight={() => "auto"}
        autoHeight
        getRowId={(row) => row._id}
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          ".MuiDataGrid-cell": {
            fontSize: "12px",
            padding: "5px 0px 5px 10px",
            // justifyContent: "center",
          },
          ".MuiDataGrid-columnHeaderTitle": {
            fontSize: "12px",
            fontWeight: 700,
            // justifyContent: "center",
          },
        }}
      />
    </Box>
  );
};

export default CompaniesList;
