import defaultAvatar from "../../assets/userIcon.png";
import "./style.css";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";

// Pinta el avatar del usuario o, si no tiene, el avatar por defecto
const UploadAvatar = ({ photo, username, setShowModal }) => {
  const { token } = useTokenContext();

  console.log("FOTO:", photo);
  return (
    <img
      className="avatarImg"
      onClick={() => {
        upload(token);
      }}
      src={photo ? `http://localhost:4000/${photo}` : defaultAvatar}
      alt={`${username} avatar`}
    />
  );
};

export default UploadAvatar;

//UPLOAD
const upload = (token) => {
  var input = document.createElement("input");
  input.type = "file";
  input.click();
  input.onchange = async (e) => {
    const formData = new FormData();
    var file = e.target.files[0];
    formData.set("file", file);
    console.log(file);
    try {
      const res = await fetch("http://localhost:4000/users/edit", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Accedemos al body de la respuesta
      const body = await res.json();

      // Si la respuesta viene mal, lanzamos un error con el mensaje que viene en el body
      if (!res.ok) {
        throw new Error(body.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.success("¡Subida completada!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
};
