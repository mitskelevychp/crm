import { Routes, Route } from "react-router-dom";
import HomePage from "./startPage/HomePage";
import LogInPage from "./logInPage/LogInPage";
import UserPage from "./userPage/UserPage";
import withAuth from "./withAuth";
import withAuthCompanyPage from "./withAuthCompanyPage";
import CompanyPage from "./companyPage/CompanyPage";

type UserType = {
  firstName: string;
  lastName: string;
  login: string;
  mainUser: boolean;
  _id: string;
};

type AppRoutesType = {
  isLoggedIn: string | null;
  user: UserType | null;
};

const ProtectedUserPage = withAuth(UserPage, "/log-in", true);
const ProtectedCompanyPage = withAuthCompanyPage(CompanyPage);

const AppRoutes: React.FC<AppRoutesType> = ({ isLoggedIn, user }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
      <Route path="/user" element={<ProtectedUserPage />} />
      <Route path="/log-in" element={<LogInPage />} />
      <Route
        path="/companies/:itemNo"
        element={<ProtectedCompanyPage user={user} />}
      />
      {/* <Route path="/companies/:itemNo" element={<CompanyPage user={user} />} /> */}
    </Routes>
  );
};

export { AppRoutes };
