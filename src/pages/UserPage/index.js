import "./style.css";

//Components
import UserHeader from "../../components/UserHeader";
import useFiles from "../../hooks/useFiles";
import { FileBrowser } from "../../components/FileBrowser";

const UserPage = () => {
  const { files } = useFiles();
  console.log(files);

  return (
    <section id="userpage">
      <UserHeader />
      <FileBrowser files={files} />
    </section>
  );
};

export default UserPage;
