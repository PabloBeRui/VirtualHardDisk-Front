//Styles
import "./style.css";

//React Components
import { useEffect, useState } from "react";

//Function Import
import upload from "../../functions/upload";
import eraseFiles from "../../functions/eraseFiles";
import deleteFolder from "../../functions/deleteFolder";
import download from "../../functions/download";
import downloadInsideFolder from "../../functions/downloadInsideFolder";

//Toastify Alerts
import "react-toastify/dist/ReactToastify.css";

//Chonky Library
import { ChonkyActions, FullFileBrowser, setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";

//Our Components
import FolderModal from "../FolderModal";

//Contexts
import { useTokenContext } from "../../contexts/TokenContext";

setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const FileBrowser = ({ files }) => {
  const { loggedUser, token } = useTokenContext();
  const { userId } = loggedUser;
  const [folderChain, setFolderChain] = useState([
    { id: userId, name: "Home", isDir: true },
  ]);
  const [currentFiles, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (loggedUser.userId) {
      setFolderChain([{ id: loggedUser.userId, name: "Home", isDir: true }]);
      setFiles(files.filter((file) => file.parentId === loggedUser.userId));
    }
  }, [loggedUser.userId, files]);

  useEffect(() => {
    setFiles(files.filter((file) => file.parentId === userId));
  }, [files, userId]);

  setChonkyDefaults({
    disableDefaultFileActions: true,
  });

  const fileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.DeleteFiles,
    ChonkyActions.CreateFolder,
  ];

  //FOLDERS PATH

  const handleFileAction = (data) => {
    switch (data.id) {
      case "upload_files":
        upload(folderChain, token);
        break;

      case "delete_files":
        if (data.state.contextMenuTriggerFile.isDir) {
          deleteFolder(data, token);
          break;
        }
        eraseFiles(data, token, folderChain);
        break;

      case "download_files":
        if (data.state.contextMenuTriggerFile.parentId !== userId) {
          downloadInsideFolder(data, token);
          break;
        }
        download(data, token);
        break;

      case "create_folder":
        setShowModal(true);
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
  return (
    <div id="chonckytextcolor" style={{ height: "100vh", color: "white" }}>
      <FullFileBrowser
        files={currentFiles}
        folderChain={folderChain}
        fileActions={fileActions}
        onFileAction={handleFileAction}
        enableDragAndDrop={true}
      />
      {showModal && <FolderModal setShowModal={setShowModal}></FolderModal>}
    </div>
  );
};
