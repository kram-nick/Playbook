import { Documents } from "../../core/constants";
import Footer from "../Footer/Footer";
import Mobile from "../Header/Mobile/Mobile";
import TermsHeader from "../TermsHeader/TermsHeader";
import TermsInfo from "../TermsInfo/TermsInfo";

const TermsOfUse = () => {
  return (
    <>
      <div
        className=" bg-no-repeat bg-center bg-cover min-h-[950px] pb-[202px] 2xl-[2000px]:h-[960px]
        max-[415px]:h-[900px]
        max-[415px]:bg-mob-transparent
        max-[910px]:min-h-[910px]
        max-lg:bg-tablet-transparent
        max-lg:min-h-[980px]
        lg:bg-term-back
      ">
        <TermsHeader />
        <Mobile />
        <div
          className="pt-[94px] pl-[14vw]
        max-sm:pl-[16px]
        max-sm:pr-[17px]
        ">
          <h1
            className="font-poppins text-[40px] leading-[52px] font-bold text-buttons-color
          max-sm:text-[28px]
          max-sm:tracking-[-1%]
          ">
            Documents
          </h1>
          <ul className="mt-[48px] flex flex-col gap-[16px] list">
            <li className="flex gap-[20px] items-center text-buttons-color font-semibold">
              <div className="h-[8px] w-[8px] bg-buttons-color"></div>
              <span
                className="font-poppins text-[24px] leading-[36px]
              max-sm:text-[20px]
              max-sm:leading-[28px]
              max-sm:font-medium
              max-sm:tracking-[-0.1px]
              ">
                Terms of Use
              </span>
            </li>
            {Documents.map((document: string) => (
              <li className="flex gap-[20px] items-center text-buttons-color font-semibold underline">
                <div className="h-[8px] w-[8px] bg-buttons-color"></div>
                <span
                  className="font-poppins text-[24px] leading-[36px]
                max-sm:text-[20px]
                max-sm:leading-[28px]
                max-sm:font-medium
                max-sm:tracking-[-0.1px
                ">
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
