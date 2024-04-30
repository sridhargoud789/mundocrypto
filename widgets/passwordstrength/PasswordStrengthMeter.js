import { useTranslation } from "react-i18next";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }) => {
  const { t } = useTranslation();
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return t("signup.strength_very_weak");
      case 1:
        return t("signup.strength_weak");
      case 2:
        return t("signup.strength_fear");
      case 3:
        return t("signup.strength_good");
      case 4:
        return t("signup.strength_strong");
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "7px",
  });

  return (
    <>
      <div className="progress" style={{ height: "7px" }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
};

export default PasswordStrengthMeter;
