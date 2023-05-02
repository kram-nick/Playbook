import ContentChapters from "../../components/ContentChapters"; 
import Sidebar from "../../components/Sidebar/Sidebar";

const Chapters = () => {
  return (
    <div className="bg-create-bg-main flex flex-row min-h-[100vh]">
      <Sidebar />
      <ContentChapters />
    </div>
  );
};

export default Chapters;
