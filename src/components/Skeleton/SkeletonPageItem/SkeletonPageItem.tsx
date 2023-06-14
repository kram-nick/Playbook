import classNames from "classnames";
import React from "react";

const SkeletonPageItem = () => {
  return (
    <div
      className={classNames({
        "ph-item": true,
      })}>
      {/* <div className="ph-col-12">
        <div className="ph-picture"></div>
        <div className="ph-row">
          <div className="ph-col-4"></div>
          <div className="ph-col-8 empty"></div>
          <div className="ph-col-12"></div>
        </div>
      </div> */}
      <div>
        <div className="ph-row">
          <div className="ph-col-8 big"></div>
          <div className="ph-col-4 big empty"></div>
          <div className="ph-col-10 empty"></div>
          <div className="ph-col-4"></div>
          <div className="ph-col-12"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPageItem;
