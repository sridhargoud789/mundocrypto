import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import * as React from "react";
import { Table } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { userObject } from "../../services/states";

const RewardsButton = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [userObj, setuserObject] = useRecoilState(userObject);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Account settings" className="btnBlack">
        <IconButton
          className="btnBlack"
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" value={0} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="/whitelogo.png" width={30} />
            </Box>
          </Box>{" "}
          &nbsp; Rewards&nbsp;
          <KeyboardArrowDownIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu-rewards"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Table borderless>
            <tbody>
              <tr>
                <td>Total:</td>
                <td style={{ textAlign: "right" }}>
                  <b>40 / 125</b> <img src="/coin_black.png" width={16} />
                </td>
              </tr>
              <tr>
                <td>Tokens claimed:</td>
                <td style={{ textAlign: "right" }}>
                  <b>20</b> <img src="/coin_black.png" width={16} />
                </td>
              </tr>
              <tr>
                <td>Tokens missed:</td>
                <td style={{ textAlign: "right" }}>
                  <b>10</b> <img src="/coin_black.png" width={16} />
                </td>
              </tr>
              <tr>
                <td>Pending to claim:</td>
                <td style={{ textAlign: "right" }}>
                  <b>15</b> <img src="/coin_black.png" width={16} />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <button className="btn btnClaimRewards">
                    <img src="/rewards_star.png" width={22} /> Claim reward!
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default RewardsButton;
