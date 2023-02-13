import "./style.css";

import { Link } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

import VHD_logo from "../../assets/VHD_logo.png";
import Modal from "../Modal";
import Avatar from "../Avatar";
import { useState } from "react";

const UserHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { loggedUser } = useTokenContext();

  const { username, photo } = loggedUser;

  return (
    <header className="UserHeader">
      <Link className="link" to="/">
        <img className="logoUserHeader" src={VHD_logo} alt="logo" />
      </Link>
      <Avatar photo={photo} username={username} setShowModal={setShowModal} />
      {showModal && <Modal setShowModal={setShowModal}></Modal>}{" "}
    </header>
  );
};

export default UserHeader;
