import Fab from "@mui/material/Fab";
import * as React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { claimRewards, getUserWalletList } from "services/nodeapi";
import { userProfileObject } from "services/states";
import Swal from "sweetalert2";
import { StatRightBGIcon } from "widgets";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 105,
  left: "auto",
  paddingRight: "10px",

  position: "fixed",
};

export default function RewardsFloating() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const userProfileObj = useRecoilValue(userProfileObject);
  const handleClaimNow = async () => {
    const wlResp = await getUserWalletList();
    if (wlResp.status === 200) {
      if (wlResp.data.data.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Monedero no conectado.",
          text: "Conéctese a la billetera.",
        });
        return;
      }
    }
    const resp = await claimRewards();
    if (resp.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: resp.data.message,
      }).then((result) => {
        setOpen(false);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error occured. Please try again.",
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Fab
        className="fabRewards"
        style={style}
        variant="extended"
        size="small"
        color="primary"
        aria-label="add"
        onClick={() => setOpen(!open)}
      >
        <img src="/images_optimized/mclogo_price.svg" width={20} /> &nbsp;{" "}
        {t("rewards.title")}
      </Fab>
      <Modal show={open} onHide={() => setOpen(false)} size="lg">
        <Modal.Header closeButton={false} className="d-flex flex-column">
          <img src="/images_optimized/rewards/Rewards.svg" width="80px" />{" "}
          <Modal.Title className="Rewards_claimPoints_hdr">
            {t("rewards.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="examInstrContainer">
            <Row>
              <Col xl={6} lg={6} md={12} sm={12}>
                <StatRightBGIcon
                  title={t("rewards.claimed")}
                  value={userProfileObj.request_to_collect_points}
                  summary=""
                  iconName={"/images_optimized/rewards/Claimed.svg"}
                  iconColorVariant="primary"
                  classValue="mb-4"
                />
              </Col>
              <Col xl={6} lg={6} md={12} sm={12}>
                <StatRightBGIcon
                  title={t("rewards.unclaimed")}
                  value={userProfileObj.un_collected_reward_points}
                  summary=""
                  iconName={"/images_optimized/rewards/Unclaimed.svg"}
                  iconColorVariant="primary"
                  classValue="mb-4"
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        {userProfileObj.un_collected_reward_points !== 0 && (
          <Modal.Footer className="align-items-center justify-content-center">
            <Button variant="outline-primary" onClick={() => setOpen(false)}>
              {t("rewards.later_btn")}
            </Button>
            <Button variant="primary" onClick={handleClaimNow}>
              {t("rewards.claim_btn")}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
