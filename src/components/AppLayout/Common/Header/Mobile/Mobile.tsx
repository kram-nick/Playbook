import logo from "../../../../../assets/photos/squeeze/mob-logo.svg";
import burger from "../../../../../assets/photos/common/burger.svg";
import { Link } from "react-router-dom";

const Mobile = () => {
  return (
    <header
      className=" bg-list-title flex  py-[14px] justify-between border-b-[1px] border-solid border-header-bottom
      min-[325px]:px-[16px]
      min-[325px]:py-[14.2px]
      md:px-[32px]
      lg:hidden
    ">
      <Link to="/home"><img src={logo} alt="logo" /></Link>
       
      <img src={burger} alt="burger" />
    </header>
  );
};

export default Mobile;
