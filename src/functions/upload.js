import { toast } from "react-toastify";

const upload = (folderChain, token) => {
  var input = document.createElement("input");
  input.type = "file";
  input.onchange = async (e) => {
    const formData = new FormData();
    var file = e.target.files[0];
    formData.set("file", file);

    if (folderChain.length > 1) {
      formData.append("folder", folderChain[1].name);
    }
    try {
      const res = await fetch("http://localhost:4000/files", {
        method: "POST",
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
      toast.success("Upload completed!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  input.click();
};

export default upload;
