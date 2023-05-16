import { Outlet, useLocation } from "react-router-dom"; 
import { ToastContainer } from "react-toastify";

const SqueezeLayout = () => { 
  return (
    <>

      {/* {location.pathname.slice(1) !== "main" && location.pathname.slice(1) !== "create" ? (
        <Mobile />
      ) : ('')}         */}
       
      <Outlet />
      <ToastContainer /> 
    </>
  );
};

export default SqueezeLayout;
