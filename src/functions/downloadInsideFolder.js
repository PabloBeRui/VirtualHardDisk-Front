import { toast } from "react-toastify";

const downloadInsideFolder = async (data, token) => {
  try {
    const res = await fetch(
      `http://localhost:4000/files/${data.state.contextMenuTriggerFile.parentId}/${data.state.contextMenuTriggerFile.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verificamos si la respuesta viene correcta
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    // Obtenemos el archivo a descargar
    const file = await res.blob();

    // Creamos un enlace dinámico para descargar el archivo
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = data.state.contextMenuTriggerFile.name;
    downloadLink.click();
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } finally {
    toast.success("File downloaded successfully");
  }
};

export default downloadInsideFolder;
