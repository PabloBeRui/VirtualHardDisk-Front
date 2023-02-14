import "./style.css";

//Components
import UserHeader from "../../components/UserHeader";
import useFiles from "../../hooks/useFiles";
import { FileBrowser } from "../../components/FileBrowser";
import { useTokenContext } from "../../contexts/TokenContext";

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

  const folderObjects = uniqueFolders.map((folder, i) => ({
    createdAt: new Date(),
    folder: id,
    id: i,
    isDir: true,
    name: folder,
    removed: 0,
    user_id: id,
  }));

  //FILTER.MAP, QUITANDO DUPLICADOS.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const updatedFiles = [...files, ...folderObjects];

  // const files2 = [{ ...files[0], isDir: true }, files[1]];
  console.log("UNIQUE FOLDERS:", uniqueFolders);
  return (
    <section>
      <UserHeader />
      {updatedFiles && <FileBrowser files={updatedFiles} />}{" "}
    </section>
  );
};

export default UserPage;
