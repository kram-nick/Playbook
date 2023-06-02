import { useAppSelector } from "../../../core/hooks/useRedux";

const Listings = () => {
  const { reloadChecker } = useAppSelector((state) => state.helpers);

  return <div></div>;
};

export default Listings;
