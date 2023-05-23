import Header from "../AppLayout/PrivateLayout/Header"; 
import plus from "../../assets/photos/chapter/icon-plus.svg"; 
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/hooks/useRedux";
import BookBanner from "../BookBanner";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import BookChapters from "../BookChapters";
import useHttpGet from "../../core/hooks/useHttpGet";
import { APIRoutes } from "../../core/http";
import { useLocation, useParams } from "react-router-dom";
import { setSelectedData } from "../../core/store/reducers/app/appDataSlice";


 

const ContentChapters = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { title } = useAppSelector((state) => state.app.data);
  const [playbookData, setPBData]:any = useState(null);
  const [reloadData, setReloadData] = useState(true); 
  const { data } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const {id} = useParams();
  console.log(id);
  
  useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${id}`, {
    resolve: (response: any) => { 
      if(response){
        console.log(response);
        const playbook = response.data;
        setPBData(playbook);
        dispatch(
          setSelectedData(playbook)
        )        
      } 
      setReloadData(false);
    }, 
    query: { },
    condition: reloadData,
    dependencies: [playbookData],
  });   

    
 
    useHttpGet<any>(`${APIRoutes.PLAYBOOKS}/${id}/pages`, {
      resolve: (response: any) => { 
        if(response){
          console.log(response);
          // const playbook = response.data;
          // setPBData(playbook);
          // dispatch(
          //   setSelectedData(playbook)
          // )        
        } 
        setReloadData(false);
      }, 
      query: { },
      condition: reloadData,
      dependencies: [playbookData],
    }); 
 


  console.log(location);

  return (
    <div className="w-full flex-1">
      <Header />
      <div className="p-[24px] gap-[32px]">
        <BookBanner preview={false} data={playbookData ? playbookData : null} />
        <h1 className={classNames({
            "opacity-50":!title, 
            "text-[32px] font-poppins font-bold text-home-title mb-[24px]" : true
          })}>
          {title ? (title) : (t<string>("CREATE.UNTITLED"))}
        </h1>

        <BookChapters data={playbookData ? playbookData : null} />  

        <button className="flex items-center gap-[4px] text-[16px] font-poppins font-medium text-buttons-bg">
          <img src={plus} alt="" /> 
          {(t<string>("BTNS.ADD_SECTION"))}
        </button> 
      </div>
    </div>
  );
};

export default ContentChapters;
