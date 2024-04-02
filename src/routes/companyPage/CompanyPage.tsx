import { useState, useEffect, useCallback } from "react";
// import DocumentTitle from "../DocumentTitle";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CREATE_COMPANY } from "../../endpoints/endpoints";
import { CompanyItem } from "../../components/companiesList/CompanyItem";
import CompanyType from "../../scripts/sortProducts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

type UserCompaniesListType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
  _id: string;
};
type CompanyPageProps = {
  user: UserCompaniesListType | null;
};

const CompanyPage: React.FC<CompanyPageProps> = ({ user }) => {
  const { itemNo } = useParams<string>();
  const [companyData, setCompanyData] = useState<CompanyType | null>(null);

  useEffect(() => {
    if (itemNo) {
      axios
        .get(`${CREATE_COMPANY}/${itemNo}`)
        .then((response) => {
          setCompanyData(response.data);
        })
        .catch((error) => {
          console.error("Помилка при отриманні даних компанії:", error);
        });
    }
  }, [itemNo]);

  const updateCompanyInList = useCallback((updatedCompany: CompanyType) => {
    setCompanyData(updatedCompany);
  }, []);

  return (
    <Container sx={{ minHeight: "calc(100vh - 107px)" }}>
      {/* <DocumentTitle
        title={user?.mainUser ? "CRM: Admin page" : "CRM: Manager page"}
      /> */}
      {companyData ? (
        <>
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <Link to="/user">
              <KeyboardDoubleArrowLeftIcon sx={{ color: "#184d92" }} />
            </Link>
          </Box>
          {companyData && (
            <CompanyItem
              user={user}
              company={companyData}
              updateCompanyInList={updateCompanyInList}
            />
          )}
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default CompanyPage;
