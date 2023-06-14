import classNames from "classnames";
import { SkeletonTypes } from "../../../core/models/enums";

type SkeletonPlaybookList = {
  type: string;
};

const SkeletonPlaybookList: React.FC<SkeletonPlaybookList> = ({ type }) => {
  return (
    <div
      className={classNames({
        "ph-item": true,
        "w-[calc(25%-15px)] max-xl:w-[calc(33.33%-16px)] max-[690px]:w-[100%]":
          type === SkeletonTypes.PUBLIC,
        "": type === SkeletonTypes.DISCOVER,
        "w-[calc(50%-10px)] max-[690px]:w-[100%]":
          type === SkeletonTypes.PROFILE,
      })}>
      <div className="ph-col-12">
        <div className="ph-picture"></div>
        <div className="ph-row">
          <div className="ph-col-4"></div>
          <div className="ph-col-8 empty"></div>
          <div className="ph-col-12"></div>
        </div>
      </div>
      <div>
        <div className="ph-row">
          <div className="ph-col-12"></div>
          <div className="ph-col-2"></div>
          <div className="ph-col-10 empty"></div>
          <div className="ph-col-8 big"></div>
          <div className="ph-col-4 big empty"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPlaybookList;
