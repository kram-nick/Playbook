import classNames from "classnames";

const SkeletonPlaybookFlex = () => {
  return (
    <div
      className={classNames({
        "ph-item": true,
      })}>
      <div className="ph-col-6">
        <div className="ph-row">
          <div className="ph-col-6 "></div>
          <div className="ph-col-8 "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPlaybookFlex;
