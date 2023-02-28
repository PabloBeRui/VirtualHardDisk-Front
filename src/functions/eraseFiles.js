import { toast } from "react-toastify";

const eraseFiles = async (data, token, folderChain) => {
  let folderName = "";
  if (folderChain.length > 1) {
    folderName = folderChain[1].name;
  }
  try {
    const res = await fetch(
      `http://localhost:4000/files/${data.state.contextMenuTriggerFile.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ folderName: folderName }),
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
    toast.success("File deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

export default eraseFiles;
