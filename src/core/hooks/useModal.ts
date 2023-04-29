import { useState } from "react";

export function useModal() {
  const [isOpenModal, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpenModal);
  };

  return {
    isOpenModal,
    toggle
  };
}

export function useModalDetail() {
  const [isOpenDetailModal, setisOpen] = useState(false);

  const toggleDetail = () => {
    setisOpen(!isOpenDetailModal);
  };

  return {
    isOpenDetailModal,
    toggleDetail
  };
}

export  function useModalShare() {
  const [isOpenShareModal, setisOpen] = useState(false);

  const toggleShare = () => {
    setisOpen(!isOpenShareModal);
  };

  return {
    isOpenShareModal,
    toggleShare
  };
}
export  function useModalSocial() {
  const [isOpenSocialModal, setisOpen] = useState(false);

  const toggleSocial = () => {
    setisOpen(!isOpenSocialModal);
  };

  return {
    isOpenSocialModal,
    toggleSocial
  };
}
 