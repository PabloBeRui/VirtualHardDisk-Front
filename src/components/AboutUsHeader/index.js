import "./style.css";

import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

import VHD_logo from "../../assets/VHD_logo.png";

const AboutUsHeader = () => {
  const { token } = useTokenContext();
  return (
    <header className="Header">
      <Link to="/">
        <img className="logo" src={VHD_logo} alt="logo" />
      </Link>

      <nav>
        <ul>
          {!token && (
            <>
             
              <li>
                <Link className="linkHeader" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="linkHeader" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}

          {token && (
            <>
              <li>
                <Link className="linkHeader" to="/profile">
                  UserPage
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AboutUsHeader;
