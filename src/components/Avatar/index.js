import defaultAvatar from "../../assets/userIcon.png";
import "./style.css";

// Pinta el avatar del usuario o, si no tiene, el avatar por defecto
const Avatar = ({ photo, username, setShowModal }) => {
  console.log("FOTO:", photo);
  return (
    <img
      className="avatarImg"
      onClick={(event) => {
        event.preventDefault();

        setShowModal(true);
      }}
      src={photo ? `http://localhost:4000/${photo}` : defaultAvatar}
      alt={`${username} avatar`}
    />
  );
};

export default Avatar;
