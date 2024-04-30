import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { injected } from "../../helper/web3.helper";
import {
  getUserProfileDetails,
  walletLink,
  web3Login,
} from "../../services/nodeapi";
import { userObject, userProfileObject } from "../../services/states";
const Wallet = (props) => {
  const { t } = useTranslation("");

  const router = useRouter();
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [userObj, setuserObject] = useRecoilState(userObject);
  const [userProfileObj, setUserProfileObject] =
    useRecoilState(userProfileObject);

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

  const signMessage = (chainId, walletAddress) => {
    const msg = `MundoCrypto solicita acceso con tu cuenta ${walletAddress} para verificar tu identidad`;
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
              text: "Wallet vinculada a la cuenta correctamente",
            });
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
            setuserObject(d.data);
            localStorage.setItem("access_token", d.data.access_token);
            const upResp = await getUserProfileDetails();
            setUserProfileObject(upResp.data.userData);
            if (resp.data.data.email == "") {
              Swal.fire({
                icon: "question",
                title: "Email no conectado",
                text: "Te recomendamos que conectes tu email para una mejor experiencia",
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
      const provider = await activate(injected);
      console.log("provider", provider);

      await signMessageWithEther();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className={`${props.isMobile ? "d-grid gap-2" : ""}`}>
      <Button
        disabled={walletConnected}
        className="btn-sm btn btn-dark-blue"
        onClick={metamask}
      >
        {walletText}
      </Button>
    </div>
  );
};

export default Wallet;
