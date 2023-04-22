import NewDraft from "../../components/NewDraft/NewDraft";
import Sidebar from "../../components/Sidebar/Sidebar";

const DraftContainer = () => {
  return (
    <div className="bg-create-bg-main flex flex-row h-[100vh]">
      <Sidebar />
      <NewDraft />
    </div>
  );
};

export default DraftContainer;
