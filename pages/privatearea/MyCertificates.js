// import node module libraries
import Icon from "@mdi/react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Nav,
  ProgressBar,
  Row,
  Tab,
} from "react-bootstrap";

// import widget/custom components
import { useMediaQuery } from "react-responsive";
import { GeeksSEO } from "widgets";
import i18 from "../../next-i18next.config";

// import profile layout wrapper
import { mdiShareOutline } from "@mdi/js";
import { Divider } from "@mui/material";
import LoadingSpinner from "components/bootstrap/loadingspinner";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import _ from "lodash";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  downloadNFT,
  getMyCourses,
  getNFTData,
  mintNFT,
} from "services/nodeapi";
import Swal from "sweetalert2";

import groovyWalkAnimation from "animations/comingsoon.json";
import { ethers } from "ethers";
import Lottie from "lottie-react";

const style = {
  height: 200,
};
const MyCertificates = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const comingSoon = false;
  const [unMinted, setUnMinted] = useState([]);
  const [minted, setMinted] = useState([]);
  const [show, setShow] = useState(false);
  const [popupURL, setPopupURL] = useState("");

  const [walletConnected, isWalletConnected] = useState(false);
  const [walletText, setWalletText] = useState(t("header.connectToWallet"));
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
              isWalletConnected(false);
              setWalletAddress(null);
              setWalletText(t("header.connectToWallet"));
            } else {
              if (
                window.ethereum.networkVersion !=
                process.env.NEXT_PUBLIC_CHAIN_ID
              ) {
                isWalletConnected(false);
                setWalletAddress(null);
                setWalletText(t("header.connectToWallet"));
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Please connect to ethereum network",
                });

                return;
              }
            }
          });
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          isWalletConnected(true);
          setWalletAddress(address);
          setWalletTextHelper(address);
        }
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, [walletConnected]);

  const setWalletTextHelper = (walletAddress) => {
    const text = `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`;
    setWalletText(text);
  };
  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    try {
      const clresp = await getMyCourses();

      if (clresp.status === 200) {
        const _UnMinted = _.filter(clresp.data.list, { is_nft_minted: 0 });
        const _dataMinted = _.filter(clresp.data.list, { is_nft_minted: 1 });

        let _Minted = [];
        let _m = [];

        for (let index = 0; index < _dataMinted.length; index++) {
          const d = _dataMinted[index];
          try {
            const nftURL = await getNFTImgURL(d.nft_data.IpfsHash);

            _m.push({ ...d, nftURL });
          } catch (e) {
            console.log(e);
          }
        }
        setMinted(_m);
        setUnMinted(_UnMinted);
      } else {
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error occured",
        text: "Please try again after sometime.",
      }).then((result) => {
        //  router.push("/");
      });
    }
  };

  const handleDownloadNFT = async (courseId, courseName) => {
    setIsLoading(true);
    try {
      const resp = await downloadNFT({ courseId });
      let isError = false;
      let msg = "";
      if (resp.status === 200) {
        if (resp.data.isSuccess) {
          const ImageBase64 = resp.data.data.data;
          var a = document.createElement("a"); //Create <a>
          a.href = "data:image/png;base64," + ImageBase64; //Image Base64 Goes here
          a.download = "" + courseName + ".png"; //File name Here
          a.click();
        } else {
          isError = true;
          msg = resp.data.message;
        }
      } else {
        msg = t("error.sometime");
      }
      setIsLoading(false);
      if (isError) {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: msg,
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error occured",
        text: "Please try again after sometime.",
      });
    }
  };
  const handleMint = async (courseId) => {
    setIsLoading(true);
    try {
      const resp = await mintNFT({ courseId });
      let isError = false;
      let msg = "";
      if (resp.status === 200) {
        if (resp.data.isSuccess) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully minted NFT.",
          });
          pageLoad();
        } else {
          isError = true;
          msg = resp.data.message;
        }
      } else {
        msg = t("error.sometime");
      }
      setIsLoading(false);
      if (isError) {
        Swal.fire({
          icon: "error",
          title: "Error occured",
          text: msg,
        });
      }
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error occured",
        text: "Please try again after sometime.",
      });
    }
  };
  const handlePurchaseNFT = async (courseId) => {
    if (walletConnected) {
      router.push(`/NFTCheckout/${courseId}`);
    } else {
      Swal.fire({
        icon: "error",
        title: t("error.error"),
        text: t("header.connectToWallet"),
      });
    }
  };
  const PendingCertificate = () => {
    return (
      <div>
        {!_.isEmpty(unMinted) && (
          <Alert key={"info"} variant={"info"}>
            Solo puedes mintear tu NFT cuando el progreso del curso es del 100%.
          </Alert>
        )}
        {!_.isEmpty(unMinted) &&
          unMinted.map((item, index) => (
            <>
              {!item.courseData.is_public && (
                <div key={index}>
                  <Card
                    className={`${
                      !isDesktop && !isLaptop
                        ? "mt-2 p-4 mb-4 card-hover d-flex flex-column"
                        : "mt-2 p-4 mb-4 card-hover d-flex flex-row"
                    }`}
                  >
                    <Col
                      lg={4}
                      md={4}
                      sm={12}
                      className="d-flex align-items-start justify-content-center"
                    >
                      <img
                        src={item.courseData.signed_url_image}
                        width={"250px"}
                      ></img>
                    </Col>
                    <Col
                      lg={8}
                      md={8}
                      sm={12}
                      className={`${
                        !isDesktop && !isLaptop ? "px-2 pt-3" : "px-5"
                      }`}
                    >
                      <h3>{item.courseData.name}</h3>
                      <div className="py-2 d-flex align-content-center justify-content-between">
                        <span>ID</span>
                        <span>{item.courseData.id}</span>
                      </div>
                      <Divider />
                      <div className="py-2 d-flex align-content-center justify-content-between">
                        <span>Duración</span>
                        <span>{item.courseData.duration} Horas</span>
                      </div>
                      <Divider />
                      <div className="py-2 d-flex align-content-center justify-content-between">
                        <span>Completed on</span>
                        <span>{item.completed_at}</span>
                      </div>
                      <Divider />
                      <div className="py-2 d-flex align-content-center justify-content-between">
                        <span>Instructor</span>
                        <span>Mundocrypto</span>
                      </div>
                      <Divider />

                      <div className="py-2 d-flex align-content-center justify-content-between">
                        <span>Progress</span>
                        {item.courseData.progress > 0 ? (
                          <span>
                            <ProgressBar
                              variant={
                                item.courseData.progress === 100
                                  ? "success"
                                  : "warning"
                              }
                              now={item.progress}
                              className="w-100"
                              label={`${item.progress}%`}
                              //  style={{ height: "5px" }}
                            />
                          </span>
                        ) : (
                          <span>No empezado</span>
                        )}
                      </div>
                      <Divider />
                      {(item.progress === 100 || item.progress > 100) && (
                        <div
                          className={`${
                            !isDesktop && !isLaptop
                              ? "d-flex align-items-center justify-content-center pt-4"
                              : "d-flex align-items-center justify-content-end pt-4"
                          }`}
                        >
                          {item.courseData.is_public ? (
                            <Button
                              type="button"
                              className="btn  btn-sm"
                              variant="primary"
                              onClick={() =>
                                handlePurchaseNFT(item.courseData.id)
                              }
                            >
                              Get Now for $50
                            </Button>
                          ) : (
                            <>
                              {item.course_id !== 38 && (
                                <div>
                                  <Button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    style={{
                                      width: "108px",
                                      marginLeft: "20px",
                                    }}
                                    onClick={() =>
                                      handleDownloadNFT(
                                        item.courseData.id,
                                        item.courseData.name
                                      )
                                    }
                                  >
                                    Download
                                  </Button>
                                </div>
                              )}
                              <div>
                                <Button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm"
                                  variant="outline-primary"
                                  style={{ width: "108px", marginLeft: "20px" }}
                                >
                                  <Icon
                                    path={mdiShareOutline}
                                    size={1}
                                    className="mx-2"
                                  />
                                  Share
                                </Button>
                              </div>
                              <div>
                                <Button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  style={{ width: "108px", marginLeft: "20px" }}
                                  onClick={() => handleMint(item.courseData.id)}
                                >
                                  Mint
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {item.course_id === 38 && (
                        <div
                          className={`${
                            !isDesktop && !isLaptop
                              ? "d-flex align-items-center justify-content-center pt-4"
                              : "d-flex align-items-center justify-content-end pt-4"
                          }`}
                        >
                          <div>
                            <Button
                              type="button"
                              className="btn btn-primary btn-sm"
                              style={{ width: "108px", marginLeft: "20px" }}
                              onClick={() =>
                                handleDownloadNFT(
                                  item.courseData.id,
                                  item.courseData.name
                                )
                              }
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Card>
                </div>
              )}
            </>
          ))}
        {_.isEmpty(unMinted) && (
          <Alert variant="info">
            {t("pages.no_courses_my_learning")}{" "}
            <Link href="/CourseList">{t("pages.no_courses_cart_2")}</Link>
          </Alert>
        )}
      </div>
    );
  };
  const getNFTImgURL = async (hash) => {
    const resp = await getNFTData(hash);
    return resp.data.image;
  };
  const MintedCertificate = () => {
    return (
      <div>
        {_.isEmpty(minted) && (
          <Alert variant="info">
            {t("pages.no_courses_my_learning")}{" "}
            <Link href="/CourseList">{t("pages.no_courses_cart_2")}</Link>
          </Alert>
        )}
        {!_.isEmpty(minted) &&
          minted.map((item, index) => (
            <div key={index}>
              <Card
                className={`${
                  !isDesktop && !isLaptop
                    ? "mt-2 p-4 mb-4 card-hover d-flex flex-column"
                    : "mt-2 p-4 mb-4 card-hover d-flex flex-row"
                }`}
              >
                <Col
                  lg={4}
                  md={4}
                  sm={12}
                  className="d-flex align-items-start justify-content-center"
                >
                  <img
                    src={item.nftURL}
                    onClick={() => {
                      setPopupURL(item.nftURL);
                      setShow(true);
                    }}
                    role="button"
                    width={"250px"}
                    className="pointer"
                  ></img>
                </Col>
                <Col
                  lg={8}
                  md={8}
                  sm={12}
                  className={`${
                    !isDesktop && !isLaptop ? "px-2 pt-3" : "px-5"
                  }`}
                >
                  <h3>{item.courseData.name}</h3>
                  <div className="py-2 d-flex align-content-center justify-content-between">
                    <span>ID</span>
                    <span>{item.courseData.id}</span>
                  </div>
                  <Divider />
                  <div className="py-2 d-flex align-content-center justify-content-between">
                    <span>Duration</span>
                    <span>{item.courseData.duration} Horas</span>
                  </div>
                  <Divider />
                  <div className="py-2 d-flex align-content-center justify-content-between">
                    <span>Completed on</span>
                    <span>{item.completed_at}</span>
                  </div>
                  <Divider />
                  <div className="py-2 d-flex align-content-center justify-content-between">
                    <span>Instructor</span>
                    <span>Mundocrypto</span>
                  </div>
                  <Divider />
                  <div
                    className={`${
                      !isDesktop && !isLaptop
                        ? "d-flex align-items-center justify-content-center pt-4"
                        : "d-flex align-items-center justify-content-end pt-4"
                    }`}
                  >
                    <div>
                      <Button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ width: "108px", marginLeft: "20px" }}
                        onClick={() =>
                          handleDownloadNFT(
                            item.courseData.id,
                            item.courseData.name
                          )
                        }
                      >
                        Download
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant=""
                        className="btn btn-link btn-sm text-decoration-none text-nowrap"
                        href={
                          process.env.NEXT_PUBLIC_OPENSEA_URL +
                          "/" +
                          process.env.NEXT_PUBLIC_NFT_CONTRACT +
                          "/" +
                          item.nft_data.nft_id
                        }
                        target="_blank"
                        style={{ color: "black" }}
                      >
                        <img
                          src="/images_optimized/opensea_icon.png"
                          width={24}
                          className="mx-2"
                        />
                        View in OpenSea
                      </Button>
                    </div>

                    <div>
                      <Button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ width: "108px", marginLeft: "20px" }}
                        onClick={() => {
                          setPopupURL(item.nftURL);
                          setShow(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Col>
              </Card>
            </div>
          ))}
      </div>
    );
  };

  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="My Certificates | MundoCrypto" />
      <LoadingSpinner showLoading={isLoading} />
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img className="img-fluid" src={popupURL} />
        </Modal.Body>
      </Modal>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">My Certificates</h3>
            <p className="mb-0">
              You can view and mint all of your Certificates.
            </p>
          </div>
        </Card.Header>
        <Card.Body className="p-0"></Card.Body>
      </Card>
      {comingSoon && (
        <div className="bg-white">
          <Container className="d-flex flex-column">
            <Row className="align-items-center justify-content-center g-0 py-lg-10 py-4">
              {/* Docs */}

              <Col lg={12} md={12} sm={12} className="mt-8 mt-lg-0">
                {" "}
                <h3
                  className="display-3  justify-content-center align-items-center text-center "
                  style={{ fontWeight: "500", fontSize: "24px" }}
                >
                  Coming soon
                </h3>
                <Lottie
                  animationData={groovyWalkAnimation}
                  loop={true}
                  style={style}
                />
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {!comingSoon && (
        <Tab.Container defaultActiveKey={"pending"}>
          <Card className="mt-4 mb-2">
            <Nav className="nav-lb-tab">
              <Nav.Item>
                <Nav.Link
                  href={`#pending`}
                  eventKey={"pending"}
                  className="mb-sm-3 mb-md-0"
                >
                  Pending
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href={`#minted`}
                  eventKey={"minted"}
                  className="mb-sm-3 mb-md-0"
                >
                  Minted
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card>

          <Tab.Content>
            <Tab.Pane eventKey="pending">
              <PendingCertificate />
            </Tab.Pane>
            <Tab.Pane eventKey="minted">
              <MintedCertificate />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      )}
    </ProfileLayout>
  );
};

export default MyCertificates;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
