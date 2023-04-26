import MainContent from "../../components/MainContent"; 
import Sidebar from "../../components/Sidebar/Sidebar";

const MainContainer = () => {
  return (
    <div className="bg-create-bg-main flex flex-row min-h-[100vh]">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default MainContainer;
