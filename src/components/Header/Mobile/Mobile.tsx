import logo from "../../../assets/photos/common/logo.svg";
import burger from "../../../assets/photos/common/burger.svg";

const Mobile = () => {
  return (
    <div
      className=" bg-list-title flex  py-[14px] justify-between border-b-[1px] border-solid border-header-bottom
      min-[325px]:px-[16px]
      min-[325px]:py-[14.2px]
      md:px-[32px]
      lg:hidden
    ">
      <img src={logo} alt="logo" />
      <img src={burger} alt="burger" />
    </div>
  );
};

export default Mobile;
