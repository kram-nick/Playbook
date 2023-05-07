import SettingContent from "../../components/SettingContent";
import Sidebar from "../../components/Sidebar/Sidebar";

const Settings = () => {
  return (
    <div className="bg-create-bg-main flex flex-row min-h-[100vh]">
      <Sidebar />
      <SettingContent />
    </div>
  );
};

export default Settings;
