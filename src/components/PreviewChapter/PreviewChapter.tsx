import Header from "../AppLayout/PrivateLayout/Header";
import { useAppSelector } from "../../core/hooks/useRedux";
import classNames from "classnames";

const PreviewChapter = () => {
  const { data } = useAppSelector((state) => state.app);

  return (
    <div className="w-full flex-1">
      <Header previewState={true} />
      <div className="p-[24px] gap-[32px] max-[1024px]:pt-[12px] max-[1024px]:px-[32px] max-[690px]:p-[0]">
        <div
          className="grid p-[24px] gap-y-[16px] rounded-[8px] bg-white shadow-free-trial border-[1px] border-solid border-header-bottom
           max-[690px]:py-[24px] max-[690px]:px-[16px] max-[690px]:border-[0px] max-[690px]:bg-transparent max-[690px]:shadow-none">
          <h1
            className={classNames({
              "text-[24px] font-poppins leading-normal font-semibold text-home-title":
                true,
            })}>
            {data.page_title
              ? data.page_title
              : "#1 Hire the best people through smart hiring"}
          </h1>

          {data && data.page_text ? (
            <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]">
              {data.page_text ? data.page_text : ""}
            </p>
          ) : (
            ""
          )}
          <p className="text-[20px] text-simple-text leading-[32px] tracking-[-0.1px] max-w-[800px]">
            Feel free to use any or all of these policies, and to modify them in
            whatever way makes sense for your company. We hope that by
            publishing them, other companies can benefit from our research and
            make their own policies more inclusive. All feedback and suggestions
            are appreciated. We’ve gotten several different perspectives to help
            arrive at these policies, but we are certainly missing many more and
            making mistakes as a result. This is a work in progress that we hope
            will get better with more time and more contributors. If these
            policies sound like a place where you want to work, please do look
            through our open career listings. The Obvious Employee Handbook is a
            derivative of the Tidepool Employee Handbook, which is itself
            derived from the Clef Employee Handbook. These are/were available to
            all via a Creative Commons license, and for that we are very
            thankful. We hope that many more people will suggest ways for us to
            improve these policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewChapter;
