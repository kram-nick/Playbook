import { Outlet, useLocation } from "react-router-dom"; 

const SqueezeLayout = () => { 
  return (
    <>

      {/* {location.pathname.slice(1) !== "main" && location.pathname.slice(1) !== "create" ? (
        <Mobile />
      ) : ('')}         */}
       
      <Outlet />
    </>
  );
};

export default SqueezeLayout;
