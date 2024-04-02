import { Link } from "react-router-dom";
import "./Header.css";

const Title: React.FC = () => {
  return (
    <div className="header__title-wrapper">
      <Link to="/">
        <p className="header__title">
          Alite Recruiting <span>CRM</span>
        </p>
      </Link>
    </div>
  );
};

export { Title };
