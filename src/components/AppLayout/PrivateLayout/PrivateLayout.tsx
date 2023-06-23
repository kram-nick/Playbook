import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "../../Sidebar";
import ModalWindow from "../../Modals/ModalWindow";
import Navigation from "../../Navigation/Navigation";

const PrivateLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="bg-create-bg-main flex flex-row min-h-[100vh] max-[680px]:bg-white">
        {location.pathname.slice(1) !== "profile" &&
        location.pathname.slice(1) !== "playbook" ? (
          <Sidebar />
        ) : (
          ""
        )}
        <ModalWindow />
        <Outlet />
        <Navigation />
      </div>
      <ToastContainer />
    </>
  );
};

export default PrivateLayout;
