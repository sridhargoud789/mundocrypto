import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { userObject } from "../../services/states";

const ExpertTalk = ({ classnames, variant, btnText }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const userObj = useRecoilValue(userObject);

  const handleCLick = async () => {
    // if (!_.isEmpty(userObj)) {
    //   const resp = await expertTalk();
    //   Swal.fire({
    //     icon: "success",
    //     title: "Request submitted",
    //     text: "Team will contact you soon.",
    //   });
    // } else {
    //   Swal.fire({
    //     icon: "info",
    //     title: "Login",
    //     text: "Please login.",
    //   }).then((result) => {
    //     router.push("/authentication/sign-in");
    //   });
    // }
    window.open("https://calendly.com/mentoria-mani/mentoria-mani-1", "_blank");
  };
  return (
    <Button variant={variant} className={classnames} onClick={handleCLick}>
      {t(btnText)}
    </Button>
  );
};
export default ExpertTalk;
