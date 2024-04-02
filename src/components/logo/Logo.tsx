import logo from "../../assets/pictures/alite-recruiting-logo.jpeg";
import { useNavigate } from "react-router-dom";
import "../header/Header.css";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="header__logo-wrapper">
      <img
        src={logo}
        alt="logo"
        className="header__logo"
        onClick={() => navigate("/log-in")}
      />
    </div>
  );
};

export { Logo };
