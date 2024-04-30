import { useRouter } from "next/router";
import styles from "../styles/purchasesuccess.module.css";

const PurchaseSuccess = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.lOGGEDHOMEPAGEV1}>
        <div className={styles.rectangleDiv} />
        <img
          className={styles.acceptedAchievementBoxCheckIcon}
          alt=""
          src="./paymentsuccess.svg"
        />
        <div className={styles.groupDiv}>
          <div className={styles.groupDiv1}>
            <div className={styles.rectangleDiv1} />
            <div className={styles.groupDiv2}>
              <div className={styles.orderDiv}>Order#</div>
              <div className={styles.div}>12345667</div>
            </div>
            <div className={styles.groupDiv3}>
              <div className={styles.groupDiv4}>
                <div className={styles.orderDiv}>$ 1900</div>
              </div>
              <div className={styles.groupDiv5}>
                <div className={styles.orderDiv}>Amound Paid</div>
                <div className={styles.textDiv}>{` `}</div>
              </div>
            </div>
            <div className={styles.lineDiv} />
          </div>
        </div>
        <div className={styles.clickHereIfYouAreNotAuto}>
          <span>
            <span
              className={styles.clickHereSpan}
              onClick={() => router.push("/")}
            >
              Click here
            </span>
          </span>
          <span className={styles.ifYouAreNotAutomaticallyR}>
            <span>{`  `}</span>
            <span> if you are not automatically redirected</span>
          </span>
        </div>
        <div className={styles.groupDiv6}>
          <div className={styles.paymentSuccessful}>Payment Successful !</div>
          <div className={styles.thankYouYourPaymentOf1}>
            Thank you ! Your payment of $1900 has been received.
          </div>
          <div
            className={styles.redirectingToMundocryptoAca}
          >{`Redirecting to mundocrypto academy  ...... `}</div>
        </div>
        <div className={styles.groupDiv7}>
          <img
            className={styles.capturaDePantalla20221003}
            alt=""
            src="./logo_white.png"
          />
          <div className={styles.groupDiv8}>
            <b className={styles.aCADEMYB}>ACADEMY</b>
          </div>
        </div>
      </div>
    </>
  );
};
export default PurchaseSuccess;
