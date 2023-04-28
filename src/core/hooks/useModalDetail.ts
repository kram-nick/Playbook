import { useState } from "react";

export default function useModalDetail() {
  const [isOpenDetailModal, setisOpen] = useState(false);

  const toggleDetail = () => {
    setisOpen(!isOpenDetailModal);
  };

  return {
    isOpenDetailModal,
    toggleDetail
  };
}
