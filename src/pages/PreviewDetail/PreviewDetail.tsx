import PreviewChapter from "../../components/PreviewChapter"; 
import Sidebar from "../../components/Sidebar/Sidebar";

const PreviewDetail = () => {
  return (
    <div className="bg-create-bg-main flex flex-row min-h-[100vh]">
      <Sidebar />
      <PreviewChapter />
    </div>
  );
};

export default PreviewDetail;
