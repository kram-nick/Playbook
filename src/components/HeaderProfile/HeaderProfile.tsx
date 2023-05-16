import { Link } from "react-router-dom"; 
import arrow_down from "../../assets/photos/main/arrow-down.svg";
 
const getUser = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data) : null
}

const HeaderProfile = () => { 
  const user = getUser(); 
  console.log(user)
  return (
    <Link  to="/profile" className="user flex items-center gap-[8px]">
      <div className="relative w-[40px]">
        <div className="photo bg-center bg-no-repeat bg-without-photo 
          bg-top-entrepreneur w-[40px] h-[40px] rounded-[50%]"></div>
        <div className="status absolute border-solid border-[2px] border-buttons-color 
          rounded-[50%] border-bg-white bg-checkbox-bg w-[14px] h-[14px] bottom-[-3px]
          right-[-2px]"></div>
      </div>

      <div className="text gap-y-[2px] grid max-sm:hidden">
        {user && user.name ? (
          <p className="text-[12px] font-inter font-medium text-home-title leading-[12px]">{user.name}</p>
        ) : ('')}  
        {user && user.email  ? (
          <p className="text-[10px] font-poppins font-normal text-simple-text leading-[16px] truncate max-w-[160px]">{user.email}</p>
          ) : ('')}          
      </div>
      <button className="max-sm:hidden">
        <img src={arrow_down} alt="" />
      </button>
    </Link>
  );
};

export default HeaderProfile;
