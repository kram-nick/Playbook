import { Documents } from "../../core/constants";
import Footer from "../Footer/Footer";
import TermsHeader from "../TermsHeader/TermsHeader";
import TermsInfo from "../TermsInfo/TermsInfo";

const TermsOfUse = () => {
  return (
    <>
      <div className="bg-term-back bg-no-repeat bg-center bg-cover h-[115vh] pb-[202px]">
        <TermsHeader />
        <div className="pt-[94px] pl-[14vw]">
          <h1 className="font-poppins text-[40px] leading-[52px] font-bold text-buttons-color">
            Documents
          </h1>
          <ul className="mt-[48px] flex-col gap-[16px] list">
            <li className="flex gap-[20px] items-center text-buttons-color font-semibold">
              <div className="h-[8px] w-[8px] bg-buttons-color"></div>
              <span className="font-poppins text-[24px] leading-[36px]">
                Terms of Use
              </span>
            </li>
            {Documents.map((document: string) => (
              <li className="flex gap-[20px] items-center text-buttons-color font-semibold underline">
                <div className="h-[8px] w-[8px] bg-buttons-color"></div>
                <span className="font-poppins text-[24px] leading-[36px]">
                  {document}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <TermsInfo />
      <Footer />
    </>
  );
};

export default TermsOfUse;
