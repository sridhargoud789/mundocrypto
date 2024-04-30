// import node module libraries
import { Container, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

// import custom components

const FeaturesList = () => {
  const { t } = useTranslation("common");
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <Container className="pt-5 bg-white">
      <Stack direction={isMobile ? "vertical" : "horizontal"}>
        <div className="d-flex flex-column align-items-center p-4">
          <img src="/images_optimized/home_nft.svg" width="45px" />{" "}
          <span className=" flTitle">Obtén recompensas y certificado NFT</span>
          <span className="fldescription pt-2 ">
            Premiamos a los mejores alumnos Consigue tu certificado NTF
            acreditativo al terminar la formación
          </span>
        </div>
        <div className={isMobile ? "hrDivider" : "vr"} />
        <div className="d-flex flex-column align-items-center p-4">
          <img src="/images_optimized/home_play.svg" width="50px" />{" "}
          <span className="pt-2 flTitle">Cursos Online y acceso vitalicio</span>
          <span className="fldescription pt-2 ">
            Aprende a tu ritmo, sin importar dónde te encuentres, Desde 15 min
            al día
          </span>
        </div>
        <div className={isMobile ? "hrDivider" : "vr"} />
        <div className="d-flex flex-column align-items-center p-4">
          <img src="/images_optimized/home_jobs.svg" width="50px" />{" "}
          <span className="  pt-2 flTitle">Bolsa de Trabajo</span>
          <span className="fldescription pt-2">
            Descubre Oportunidades Únicas en la Industria Digital con
            MundoCrypto Jobs
          </span>
        </div>
      </Stack>
    </Container>
  );
};
export default FeaturesList;
