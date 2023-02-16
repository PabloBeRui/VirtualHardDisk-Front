import "./style.css";

//Components
import UserHeader from "../../components/UserHeader";
import useFiles from "../../hooks/useFiles";
import { FileBrowser } from "../../components/FileBrowser";
import { useTokenContext } from "../../contexts/TokenContext";

import { useEffect, useRef } from "react";

const UserPage = () => {
  const { loggedUser } = useTokenContext();
  const { files } = useFiles();
  const { userId } = loggedUser;
  const uniqueFolders = useRef([]);
  console.log("FILES PRE:", files);

  useEffect(() => {
    uniqueFolders.current = findFolders(files);
  }, [files]);

  const findFolders = (files) => {
    const defaultFolder = userId;
    const uniqueFolders = [];

    for (const file of files) {
      if (file.folder !== defaultFolder) {
        uniqueFolders.push(file.folder);
      }
    }

    return uniqueFolders;
  };

  // const folderObjects = uniqueFolders.current.map((folder) => ({
  //   id: uuid(),
  //   name: folder,
  //   isDir: false,
  //   parentId: id,
  // }));

  const updatedFiles = files.map((file) => {
    if (file.isDir) {
      return {
        ...file,
        parentId: file.parentId ? file.parentId : userId,
      };
    } else {
      return file;
    }
  });

  console.log("Updated files:", updatedFiles);
  return (
    <section id="userpage">
      <UserHeader />
      {updatedFiles && <FileBrowser files={updatedFiles} />}
    </section>
  );
};

export default UserPage;
