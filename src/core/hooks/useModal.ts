import {
  setIsModalOpen,
  setModalType,
} from "../store/reducers/app/appDataSlice";
import { useAppDispatch } from "./useRedux";

const useModal = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setModalType(""));
    dispatch(setIsModalOpen(false));
  };

  const openModal = (type: string) => {
    dispatch(setModalType(type));
    dispatch(setIsModalOpen(true));
  };

  return { openModal, closeModal };
};

export default useModal;
