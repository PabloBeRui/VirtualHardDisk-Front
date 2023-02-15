import "./style.css";
import "react-toastify/dist/ReactToastify.css";

import { ChonkyActions, FullFileBrowser } from "chonky";
import { setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { useTokenContext } from "../../contexts/TokenContext";
import { toast } from "react-toastify";

setChonkyDefaults({ iconComponent: ChonkyIconFA });
export const FileBrowser = ({ files }) => {
  const { token } = useTokenContext();
  console.log(files);

  setChonkyDefaults({
    disableDefaultFileActions: true,
  });

  const fileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.DeleteFiles,
    ChonkyActions.CreateFolder,
  ];

  //UPLOAD
  const upload = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = async (e) => {
      const formData = new FormData();
      var file = e.target.files[0];
      formData.set("file", file);
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

    input.click();
  };

  //DELETE
  const eraseFiles = async (data) => {
    try {
      const res = await fetch(
        `http://localhost:4000/files/${data.state.contextMenuTriggerFile.id}`,
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
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.success("Archivo borrado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  //DOWNLOAD
  const download = async (data) => {
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
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      toast.success("Archivo descargado correctamente");
    }
  };

  //CREATE FOLDER
  const createFolder = async (folderName) => {
    try {
      let newFolderName = folderName;
      const res = await fetch(`http://localhost:4000/folder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newFolderName }),
      });

      // Verificamos si la respuesta viene correcta
      if (!res.ok) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      toast.success("Archivo descargado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleFileAction = (data) => {
    console.log(data);

    switch (data.id) {
      case "upload_files":
        upload();
        break;

      case "delete_files":
        eraseFiles(data);
        break;

      case "download_files":
        download(data);
        break;

      case "create_folder":
        const folderName = prompt("Nombre de tu carpeta:");
        createFolder(folderName);
        break;

      default:
        break;
    }
  };

  const folderChain = [{ id: "xcv", name: "root", isDir: true }];

  // const files2 = [{ ...files[0], isDir: true }, files[1]];
  // console.log("FILES 2:", files2);
  return (
    <div id="chonckytextcolor" style={{ height: "100vh", color: "white" }}>
      <FullFileBrowser
        files={files}
        folderChain={folderChain}
        fileActions={fileActions}
        onFileAction={handleFileAction}
        enableDragAndDrop={true}
      />
    </div>
  );
};
