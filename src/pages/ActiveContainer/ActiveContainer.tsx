import ActivePlaybooks from "../../components/ActivePlaybooks/ActivePlaybooks";
import AppHeader from "../../components/AppHeader/AppHeader";

const ActiveContainer = () => {
  return (
    <div className="w-full flex-1">
      <AppHeader />
      <ActivePlaybooks />
    </div>
  );
};

export default ActiveContainer;
