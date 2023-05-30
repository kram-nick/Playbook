import { useTranslation } from "react-i18next";

const TermsInfo = () => {
  const { t } = useTranslation();

  return (
    <div
      className="lg:max-w-[790px] mx-auto mt-[80px] pb-[149px]
    max-sm:px-[16px]
    max-lg:px-[32px]
    "
    >
      <div>
        <h1
          className="text-home-title font-poppins text-[40px] leading-[52px] font-bold
        max-sm:text-[28px]
        max-sm:leading-[36.4px]
        "
        >
          {t<string>("TERM.TERM_TITLE")}
        </h1>
        <p
          className="font-poppins font-normal text-[20px] mt-[23px] leading-[28px] text-simple-text tracking-[-0.1px]
        max-sm:text-[16px]
        max-sm:leading-[36.4px]
        "
        >
          {t<string>("TERM.EFFECTIVE")} August 17, 2021
        </p>
      </div>
      <div>
        <h2
          className="font-poppins text-home-title leading-[36px] mt-[44px] text-[24px] font-semibold

        "
        >
          {t<string>("TERM.WELCOME")}
        </h2>
        <p
          className="font-poppins text-simple-text mt-[28px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.WELCOME_P_1")
            .split(" ")
            .slice(0, t<string>("TERM.WELCOME_P_1").split(" ").length - 1)
            .join(" ")}{" "}
          <a className="underline" href="mailto:tos@substackinc.com">
            {
              t<string>("TERM.WELCOME_P_1").split(" ")[
                t<string>("TERM.WELCOME_P_1").split(" ").length - 1
              ]
            }
          </a>{" "}
          .
        </p>
        <p
          className="font-poppins text-simple-text mt-[20px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.WELCOME_P_2")}
        </p>
        <p
          className="font-poppins text-simple-text mt-[20px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.WELCOME_P_3")}
        </p>
      </div>
      <div>
        <h2
          className="font-poppins text-home-title leading-[36px]  mt-[44px] text-[24px] font-semibold

        "
        >
          {t<string>("TERM.ACCOUNT")}
        </h2>
        <p
          className="font-poppins text-simple-text mt-[28px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.ACCOUNT_P_1")}
        </p>
        <p
          className="font-poppins text-simple-text mt-[20px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.ACCOUNT_P_2")}
        </p>
        <p
          className="font-poppins text-simple-text mt-[20px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.ACCOUNT_P_3")}
        </p>
      </div>
      <div>
        <h2
          className="font-poppins text-home-title leading-[36px] mt-[44px] text-[24px] font-semibold

        "
        >
          {t<string>("TERM.POSTING")}
        </h2>
        <p
          className="font-poppins text-simple-text mt-[28px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.CONTENT_P_1")}
        </p>
        <ul className="flex flex-col gap-[28px] mt-[28px]">
          <li className="flex items-start gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <span
              className="font-poppins text-simple-text text-[20px] leading-[28px]
            max-sm:text-[16px]
            "
            >
              {t<string>("TERM.CONTENT_P_2")}
            </span>
          </li>
          <li className="flex items-start gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <span
              className="font-poppins text-simple-text text-[20px] leading-[28px]
            max-sm:text-[16px]
            "
            >
              {t<string>("TERM.CONTENT_P_3")}
            </span>
          </li>
          <li className="flex items-start gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-simple-text text-[20px]
            max-sm:text-[16px]
            "
            >
              {t<string>("TERM.CONTENT_P_4")}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2
          className="font-poppins text-home-title leading-[36px] font-bold mg-[28px]  mt-[44px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.LIMITATION")}
        </h2>
        <p
          className="font-poppins text-simple-text mt-[28px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.LIMITATION_P_1")}
        </p>
        <ul className="flex flex-col gap-[20px] mt-[20px]">
          <li className="flex gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-[20px] leading-[28px] text-home-title font-bold
            max-sm:text-[16px]
            max-sm:font-semibold
            "
            >
              {t<string>("TERM.LIMITATION_P_2")}
            </p>
          </li>
          <li className="flex gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-[20px] leading-[28px] text-home-title font-bold
            max-sm:text-[16px]
            max-sm:font-semibold
            "
            >
              {t<string>("TERM.LIMITATION_P_3")}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2
          className="font-poppins text-home-title leading-[36px]  mt-[44px] text-[24px] font-semibold

        "
        >
          {t<string>("TERM.PERSONAL_DATA")}
        </h2>
        <p
          className="font-poppins text-simple-text mt-[28px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.PERSONAL_DATA_UNDER")}
        </p>
        <ul className="flex flex-col gap-[28px] mt-[28px]">
          <li className="flex gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-simple-text text-[20px] leading-[28px]
            max-sm:text-[16px]
            "
            >
              <span className="font-poppins text-home-title font-bold">
                {t<string>("TERM.PERSONAL_DATA_P_1").split(" ")[0]}
              </span>{" "}
              {t<string>("TERM.PERSONAL_DATA_P_1").split(" ")[1]}
            </p>
          </li>
          <li className="flex gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-simple-text text-[20px] leading-[28px]
            max-sm:text-[16px]
            "
            >
              <span className="text-home-title font-bold">
                {t<string>("TERM.PERSONAL_DATA_P_2")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
              </span>{" "}
              {t<string>("TERM.PERSONAL_DATA_P_2")
                .split(" ")
                .slice(2)
                .join(" ")}
            </p>
          </li>
          <li className="flex gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-simple-text text-[20px] leading-[28px]
            max-sm:text-[16px]
            "
            >
              <span
                className="text-home-title font-bold 
              max-sm:text-[16px]
              "
              >
                {t<string>("TERM.PERSONAL_DATA_P_3").split(" ")[0]}
              </span>{" "}
              {t<string>("TERM.PERSONAL_DATA_P_3")
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>
          </li>
          <li className="flex gap-[20px]">
            <div className="h-[8px] min-w-[8px] bg-buttons-bg mt-[10px]"></div>
            <p
              className="font-poppins text-simple-text text-[20px] leading-[28px]
            max-sm:text-[16px]
            "
            >
              <span
                className="text-home-title font-bold 
              max-sm:text-[16px]
              "
              >
                {t<string>("TERM.PERSONAL_DATA_P_4").split(" ")[0]}
              </span>{" "}
              {t<string>("TERM.PERSONAL_DATA_P_4")
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2
          className="font-poppins text-home-title leading-[36px]  mt-[44px] text-[24px] font-semibold
        "
        >
          {t<string>("TERM.CREATE_ACCOUNT")}
        </h2>
        <p
          className="font-poppins text-simple-text mt-[28px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.CREATE_ACCOUNT_P_1")}
        </p>
        <p
          className="font-poppins text-simple-text mt-[20px] text-[20px] leading-[28px]
        max-sm:text-[16px]
        "
        >
          {t<string>("TERM.CREATE_ACCOUNT_P_2")}
        </p>
      </div>
    </div>
  );
};

export default TermsInfo;
