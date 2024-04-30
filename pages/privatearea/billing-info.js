// import node module libraries
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Alert, Card, Dropdown, Table } from "react-bootstrap";

// import widget/custom components
import { useTranslation } from "react-i18next";
import { GeeksSEO } from "widgets";
import i18 from "../../next-i18next.config";

// import profile layout wrapper
import MCWallet from "components/bootstrap/MCWallet";
import ProfileLayout from "layouts/marketing/student/ProfileLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Swal from "sweetalert2";
import { injected } from "../../helper/web3.helper";
import {
  deleteUserWallet,
  getUserProfileDetails,
  getUserWalletList,
  updateDefaultWallet,
  walletLink,
  web3Login,
} from "../../services/nodeapi";

const BillingInfo = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { active, account, library, activate, deactivate } = useWeb3React();

  const [walletConnected, isWalletConnected] = useState(false);
  const [walletText, setWalletText] = useState("Connect to wallet");
  const [walletAddress, setWalletAddress] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [walletList, setWalletList] = useState([]);

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    setIsLoading(true);
    const resp = await getUserWalletList();
    if (resp.status === 200) {
      setWalletList(resp.data.data);
    }
    setIsLoading(false);
  };

  const setWalletTextHelper = (walletAddress) => {
    const text = `${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`;
    setWalletText(text);
  };

  const signMessage = (chainId, walletAddress) => {
    const msg = `Mundo crypto wants to sign in with your account ${walletAddress} to verify your identity`;
    return msg;
  };

  const signMessageWithEther = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    isWalletConnected(true);
    setWalletAddress(address);
    setWalletTextHelper(address);
    const signature = await signer.signMessage(signMessage(80001, address));
    console.log("signature", signature);
    if (localStorage.getItem("access_token")) {
      try {
        const resp = await walletLink({
          walletAddress: address,
          signature: signature,
        });
        if (resp.status === 200) {
          if (resp.data.isSuccess) {
            Swal.fire({
              icon: "success",
              title: "Listo",
              text: "Wallet vinculada a la cuenta con éxito",
            });
            pageLoad();
          } else if (resp.data.isSuccess === false) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: resp.data.message,
            });
          }
        } else {
          Swal.fire("Ha ocurrido un error. Inténtalo de nuevo más tarde.");
        }
      } catch (err) {
        console.log("err", err);
      }
    } else {
      try {
        const resp = await web3Login({
          walletAddress: address,
          signature: signature,
        });
        if (resp.status === 200) {
          const d = resp.data;
          if (!d.isSuccess) {
            Swal.fire("Esta Wallet no está vinculada a ninguna cuenta");
          } else {
            // setuserObject(d.data);
            localStorage.setItem("access_token", d.data.access_token);
            const upResp = await getUserProfileDetails();
            // setUserProfileObject(upResp.data.userData);
            if (resp.data.data.email == "") {
              Swal.fire({
                icon: "question",
                title: "Email no conectado",
                text: "Te recomendamos que vincules tu email a tu cuenta para una mejor experiencia.",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Conectar Email",
                cancelButtonText: "Más tarde",
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push("authentication/sign-up");
                }
              });
            }
          }
        }
      } catch (error) {
        console.log("err", error);
        Swal.fire("Ha ocurrido un error. Inténtalo de nuevo más tarde.");
      }
    }
  };
  const metamask = async () => {
    try {
      await activate(injected);
      await signMessageWithEther();
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleDefault = async (walletAddress) => {
    const resp = await updateDefaultWallet({ walletAddress });
    pageLoad();
  };

  const handleDelete = async (walletAddress) => {
    const resp = await deleteUserWallet({ walletAddress });
    pageLoad();
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link href="">
      <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    </Link>
  ));
  CustomToggle.displayName = "CustomToggle";
  const ActionMenu = (props) => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>
              {t("private_area.wallet_settings")}
            </Dropdown.Header>
            <Dropdown.Item
              eventKey="1"
              onClick={() => handleDefault(props.wallet_address)}
            >
              <i className="fe fe-edit dropdown-item-icon"></i>{" "}
              {t("private_area.wallet_set_as_default")}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => handleDelete(props.wallet_address)}
            >
              <i className="fe fe-trash dropdown-item-icon"></i>{" "}
              {t("private_area.wallet_delete")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };
  return (
    <ProfileLayout>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Wallets | MundoCrypto" />

      <Card className="border-0 mb-4">
        <Card.Header className="d-lg-flex align-items-center justify-content-between">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">{t("private_area.wallets")}</h3>
            <p className="mb-0">{t("private_area.wallet_primary_wallet")}</p>
          </div>
          {/* <div>
            <Button className="btn  btn-sm" onClick={metamask}>
              {t("private_area.wallet_add_new")}
            </Button>
          </div> */}
        </Card.Header>
        <Card.Body className="p-0 ">
          {!isLoading && (
            <div className="table-responsive border-0 ">
              <Table className="mb-0 text-nowrap ">
                <tbody>
                  {walletList.length > 0 &&
                    walletList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="align-middle border-top-0 ">
                            <div className="d-lg-flex align-items-center">
                              <h5 className="mb-0 ms-lg-3 mt-lg-0 mt-2 text-primary-hover">
                                {item.wallet_address}
                              </h5>
                            </div>
                          </td>
                          <td className="align-middle border-top-0">
                            {item.is_default === 1 ? "Default" : ""}
                          </td>
                          <td className="align-middle border-top-0">
                            <i
                              role="button"
                              onClick={() => handleDelete(item.wallet_address)}
                              className="fe fe-trash dropdown-item-icon"
                            ></i>{" "}
                            {/* <ActionMenu wallet_address={item.wallet_address} /> */}
                          </td>
                        </tr>
                      );
                    })}
                  {walletList.length === 0 && (
                    <tr>
                      <td className="align-middle border-top-0 ">
                        <Alert variant="info">
                          {t("private_area.wallet_no_added")}
                        </Alert>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      <MCWallet />
    </ProfileLayout>
  );
};

export default BillingInfo;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
