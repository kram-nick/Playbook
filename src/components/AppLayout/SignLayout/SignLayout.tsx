import { Outlet } from "react-router-dom";
import Header from "../Common/Header/Header";
import Mobile from "../Common/Header/Mobile/Mobile";

const SignLayout = () => { 
  return (
    <>
      <Header />
      <Mobile />
      <Outlet />
    </>
  );
};

export default SignLayout;
