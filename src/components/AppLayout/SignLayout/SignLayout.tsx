import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../Common/Header/Header";
import Mobile from "../Common/Header/Mobile/Mobile";

const SignLayout = () => { 
  return (
    <>
      <Header />
      <Mobile />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default SignLayout;
