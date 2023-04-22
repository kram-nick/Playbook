import { Outlet } from "react-router-dom";
import Mobile from "../Common/Header/Mobile/Mobile";

const SqueezeLayout = () => {
  return (
    <>
      <Mobile />
      <Outlet />
    </>
  );
};

export default SqueezeLayout;
