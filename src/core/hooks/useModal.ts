import { useState } from "react";

export default function useModal() {
  const [isOpenModal, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpenModal);
  };

  return {
    isOpenModal,
    toggle
  };
}
