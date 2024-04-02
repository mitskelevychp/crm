import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

const LogInIcon: React.FC = () => {
  return (
    <Link to="/log-in">
      <LoginIcon />
    </Link>
  );
};

export { LogInIcon };
