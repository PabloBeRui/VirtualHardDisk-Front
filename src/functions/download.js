import { toast } from "react-toastify";

const download = async (data, token) => {
  try {
    const res = await fetch(
      `http://localhost:4000/files/${data.state.contextMenuTriggerFile.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
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
    toast.success("File downloaded successfully");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

export default download;
