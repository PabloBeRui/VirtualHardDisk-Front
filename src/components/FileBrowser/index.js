import "./style.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { ChonkyActions, FullFileBrowser } from "chonky";
import { setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { useTokenContext } from "../../contexts/TokenContext";
import { toast } from "react-toastify";

setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const FileBrowser = ({ files }) => {
  const { loggedUser, token } = useTokenContext();
  console.log("USER: ", loggedUser);
  const { userId } = loggedUser;
  const [folderChain, setFolderChain] = useState([
    { id: userId, name: "Home", isDir: true },
  ]);
  const [currentFiles, setFiles] = useState([]);

  useEffect(() => {
    if (loggedUser.userId) {
      setFolderChain([{ id: loggedUser.userId, name: "Home", isDir: true }]);
      setFiles(files.filter((file) => file.parentId === loggedUser.userId));
    }
  }, [loggedUser.userId, files]);

  useEffect(() => {
    setFiles(files.filter((file) => file.parentId === userId));
  }, [files, userId]);
  console.log("Current antes:", currentFiles);
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
    console.log("FOLDERCHAIN ERASE:", folderChain);
    try {
      const res = await fetch(
        `http://localhost:4000/files/${data.state.contextMenuTriggerFile.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ folderName: folderChain[0].name }),
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

  //Download file inside Folder
  const downloadInsideFolder = async (data) => {
    console.log("DOWNLOADINSIDE: ", data);
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
      toast.success("Carpeta creada correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  //FOLDERS PATH

  const handleFileAction = (data) => {
    console.log(data);

    switch (data.id) {
      case "upload_files":
        upload();
        break;

      case "delete_files":
        if (data.state.contextMenuTriggerFile.isDir) {
          deleteFolder(data);
          break;
        }
        eraseFiles(data);
        break;

      case "download_files":
        if (data.state.contextMenuTriggerFile.parentId !== userId) {
          downloadInsideFolder(data);
          break;
        }
        download(data);
        break;

      case "create_folder":
        const folderName = prompt("Nombre de tu carpeta:");
        createFolder(folderName);
        break;

      case "open_files":
        handleFolderOpen(data.payload.targetFile);
        break;

      default:
        break;
    }
  };

  const handleFolderOpen = (folder) => {
    // Verificar que el elemento es una carpeta
    if (folder.isDir) {
      const { id, name } = folder;
      const newFolderChain = [...folderChain, { id, name, isDir: true }];
      const newFiles = files.filter((file) => file.parentId === folder.name);
      setFolderChain(newFolderChain);
      setFiles(newFiles);
    }
    if (folder.id === userId) {
      setFolderChain([{ id: userId, name: "Home", isDir: true }]);
      setFiles(files.filter((file) => file.parentId === userId));
    }
  };

  //DELETE FOLDER AND HIS CONTENT

  const deleteFolder = async (folder) => {
    console.log("FOLDERDELETENAME:", folder);
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
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.success("Folder deleted");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  console.log("CURRENT FILES AQUI:", currentFiles);
  console.log("Chain: ", folderChain);
  return (
    <div id="chonckytextcolor" style={{ height: "100vh", color: "white" }}>
      <FullFileBrowser
        files={currentFiles}
        folderChain={folderChain}
        fileActions={fileActions}
        onFileAction={handleFileAction}
        enableDragAndDrop={true}
      />
    </div>
  );
};
