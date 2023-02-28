import { toast } from "react-toastify";

const deleteFolder = async (folder, token) => {
  try {
    const res = await fetch(
      `http://localhost:4000/folder/${folder.state.contextMenuTriggerFile.name}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Accedemos al body de la respuesta
    const body = await res.json();

    // Si la respuesta viene mal, lanzamos un error con el mensaje que viene en el body
    if (!res.ok) {
      throw new Error(body.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } finally {
    toast.success("Folder deleted");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

export default deleteFolder;
