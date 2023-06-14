import classNames from "classnames";

const SkeletonPagePlaybook = () => {
  return (
    <div
      className={classNames({
        "ph-item": true,
      })}>
      <div className="ph-col-12 ">
        <div className="ph-picture"></div>
        <div className="ph-row">
          <div className="ph-col-8 empty"></div>
          <div className="ph-col-8 empty"></div>
          <div className="ph-col-8 empty"></div>
          <div className="ph-col-8 empty"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPagePlaybook;
