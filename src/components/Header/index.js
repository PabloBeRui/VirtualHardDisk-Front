import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import VHD_logo from "../../assets/VHD_logo.png";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Header = () => {
  const { token } = useTokenContext();
  const { loggedUser } = useTokenContext();

  const { username, photo } = loggedUser;
  const navigate = useNavigate();

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
              <li
                onClick={(event) => {
                  navigate("/profile");
                }}
              >
                <Avatar photo={photo} username={username} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
