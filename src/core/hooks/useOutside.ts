import { useState, useRef, useEffect } from "react";

export default function useOutside(initialIsVisible: any) {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event:  any) => { 
    if(ref.current && !event.target.closest('.menu')){
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return {
    ref,
    isShow,
    setIsShow
  };
}
