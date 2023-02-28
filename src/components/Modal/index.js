import "./style.css";
import { useTokenContext } from "../../contexts/TokenContext";
import logoutIcon from "../../assets/logoutIcon.png";
import UploadAvatar from "../UploadAvatar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import ButtonModal from "../ButtonModal";

// Pinta un modal blanco con un fondo oscuro. El contenido del modal es lo recibido en la prop children. También recibe setShowModal para poder cerrar el modal cuando hagamos click en el fondo oscuro
const Modal = ({ setShowModal }) => {
  const { token, setToken, loggedUser } = useTokenContext();
  const { username, photo, bio } = loggedUser;
  const [newUserName, setNewUserName] = useState("");
  const [newBio, setNewBio] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className="modalBg"
      onClick={(event) => {
        // Cuando colocamos el modal dentro de una entry, al hacer click en el fondo oscuro se activa el Link que envuelve la Entry. Para solucionar esto llamamos a event.preventDefault()
        event.preventDefault();

        // Cerramos el modal cambiando el estado showModal a false
        setShowModal(false);
      }}
    >
      <div
        id="modalContainer"
        onClick={(event) => {
          // Cuando hacemos click en el contenido del modal (lo blanco), cancelamos la propagación para que no se active el onClick del fondo del modal (lo oscuro)
          event.stopPropagation();
        }}
      >
        <section
          className="userModalIcon"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ flexGrow: 1 }}></div>
          <UploadAvatar
            photo={photo}
            username={username}
            setShowModal={setShowModal}
          />

          <div style={{ flexGrow: 1 }}></div>
          <Link
            className="link"
            to="/"
            onClick={() => {
              setToken("");
            }}
          >
            <img className="logoutIcon" src={logoutIcon} alt="logoutIcon" />
          </Link>
        </section>

        <form
          className="userModalInfo"
          onSubmit={async (event) => {
            try {
              // Cancelamos la acción por defecto del formulario
              event.preventDefault();

              // Hacemos una petición POST a la API y enviamos en el body un JSON con los datos que ha introducido el usuario en el formulario. IMPORTANTE mandar el header Content-Type indicando que el body es un JSON
              const res = await fetch("http://localhost:4000/users/edit", {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ newUserName, newBio }),
              });

              // Accedemos al body de la respuesta
              const body = await res.json();

              // Si la respuesta viene mal, lanzamos un error con el mensaje que viene en el body
              if (!res.ok) {
                throw new Error(body.message);
              }
              navigate("/profile");
              toast.success("User information has been successfully modified");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } catch (error) {
              // Si salta algún error lo sacamos por consola y se lo mostramos al usuario en una alerta
              console.error(error);
              toast.error(error.message);
            }
          }}
        >
          <input
            type="text"
            placeholder={username}
            value={newUserName}
            onChange={(event) => {
              setNewUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder={bio}
            value={newBio}
            onChange={(event) => {
              setNewBio(event.target.value);
            }}
          />
          <p>
            Change your information by entering it in the fields above and
            clicking the button below.
          </p>

          <ButtonModal text="Change Info" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
