import { useAppSelector } from "../../core/hooks/useRedux";
import { PlaybookStatus } from "../../core/models/enums";
import ActivePlaybooks from "../ActivePlaybooks/ActivePlaybooks";
import AppHeader from "../AppHeader";
import AppMainContent from "../AppMainContent";

const MainContent = () => {
  const { playbookStatus } = useAppSelector((state) => state.helpers);

  return (
    <div className="w-full flex-1">
      <AppHeader />
      {PlaybookStatus.ACTIVE === playbookStatus && <ActivePlaybooks />}
      {PlaybookStatus.UNACTIVE === playbookStatus && <AppMainContent />}
    </div>
  );
};

export default MainContent;
