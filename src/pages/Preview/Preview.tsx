import PreviewChapters from "../../components/PreviewChapters";
import Sidebar from "../../components/Sidebar/Sidebar";

const Preview = () => {
  return (
    <div className="bg-create-bg-main flex flex-row min-h-[100vh]">
      <Sidebar />
      <PreviewChapters />
    </div>
  );
};

export default Preview;
