// Section : Features
// Style : Features item with left icon

// import node module libraries
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FeatureLeftIcon = ({ item }) => {
  const { t } = useTranslation("common");
  return (
    <div className="d-flex align-items-center">
      <span className={`icon-lg   text-center fs-4`}>
        <img src={`/images_optimized/featuredlist/${item.icon}`} width={48} />
      </span>
      <div className="ms-3">
        <h4 className="mb-0 fw-semi-bold">{t(item.title)}</h4>
        <p className="mb-0">{t(item.description)}</p>
      </div>
    </div>
  );
};

// Typechecking With PropTypes
FeatureLeftIcon.propTypes = {
  item: PropTypes.any.isRequired,
};

export default FeatureLeftIcon;
