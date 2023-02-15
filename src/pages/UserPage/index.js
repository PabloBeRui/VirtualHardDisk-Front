import "./style.css";

//Components
import UserHeader from "../../components/UserHeader";
import useFiles from "../../hooks/useFiles";
import { FileBrowser } from "../../components/FileBrowser";
import { useTokenContext } from "../../contexts/TokenContext";
import uuid from "react-uuid";

const UserPage = () => {
  const { loggedUser } = useTokenContext();
  const { files } = useFiles();
  const { id } = loggedUser;
  console.log(files);
  console.log("USER:", loggedUser);

  const findFolders = (files) => {
    console.log("ME LLEGA:", files);
    const defaultFolder = id;
    const uniqueFolders = [];

    for (const file of files) {
      if (file.folder !== defaultFolder) {
        uniqueFolders.push(file.folder);
      }
    }

    return uniqueFolders;
  };

  const uniqueFolders = findFolders(files);

  const folderObjects = uniqueFolders.map((folder) => ({
    id: uuid(),
    name: folder,
    isDir: true,
  }));

  const updatedFiles = [...files, ...folderObjects];

  console.log("UNIQUE FOLDERS:", uniqueFolders);
  console.log("FOLDERS OBJECTS:", folderObjects);

  return (
    <section id="userpage">
      <UserHeader />
      {updatedFiles && <FileBrowser files={updatedFiles} />}
    </section>
  );
};

export default UserPage;
