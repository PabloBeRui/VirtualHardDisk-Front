import "./style.css";
import { useTokenContext } from "../../contexts/TokenContext";
import { toast } from "react-toastify";
import ButtonModal from "../ButtonModal";
import { useState } from "react";

// Pinta un modal blanco con un fondo oscuro. El contenido del modal es lo recibido en la prop children. También recibe setShowModal para poder cerrar el modal cuando hagamos click en el fondo oscuro
const FolderModal = ({ setShowModal }) => {
  const { token } = useTokenContext();
  const [folderName, setFolderName] = useState("");

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
        id="modalFolderContainer"
        onClick={(event) => {
          // Cuando hacemos click en el contenido del modal (lo blanco), cancelamos la propagación para que no se active el onClick del fondo del modal (lo oscuro)
          event.stopPropagation();
        }}
      >
        <h1 className="h1FolderName">New Folder</h1>

        <form
          className="formNewFolder"
          onSubmit={async (event) => {
            try {
              let newFolderName = folderName;
              // Cancelamos la acción por defecto del formulario
              event.preventDefault();

              // Hacemos una petición POST a la API y enviamos en el body un JSON con los datos que ha introducido el usuario en el formulario. IMPORTANTE mandar el header Content-Type indicando que el body es un JSON
              const res = await fetch("http://localhost:4000/folder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newFolderName }),
              });

              // Accedemos al body de la respuesta
              const body = await res.json();

              // Si la respuesta viene mal, lanzamos un error con el mensaje que viene en el body
              if (!res.ok) {
                throw new Error(body.message);
              }
              toast.success("Folder Created");
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
            className="folderModalInput"
            type="text"
            placeholder="Write folder name"
            value={folderName}
            onChange={(event) => {
              setFolderName(event.target.value);
            }}
          />

          <ButtonModal text="Submit" buttonClass="folderModalButton" />
        </form>
      </div>
    </div>
  );
};

export default FolderModal;
