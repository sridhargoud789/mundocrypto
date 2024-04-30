import { Stack } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import * as React from "react";
import { Button } from "react-bootstrap";

const Stickyfooter = ({
  dollarprice,
  mctprice,
  src,
  handleCheckout,
  btnText,
  is_sold_out,
}) => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleClick = async () => {
    handleCheckout();
  };
  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, pb: 5 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Stack
            sx={{ pt: 3 }}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={4}
            // divider={<Divider orientation="vertical" flexItem />}
          >
            <div>
              <div className="mb-0">
                <span className="text-dark fw-bold h2 me-2">
                  <img
                    src="/images_optimized/mclogo_price_black.svg"
                    className="imgPrice_Coin"
                    width="25px"
                  />{" "}
                  {mctprice}
                </span>
                <small className="fs-4 text-muted">${dollarprice}</small>
              </div>
            </div>
            <div className="d-grid gap-2">
              {is_sold_out === 1 ? (
                <Button
                  type="button"
                  disabled={true}
                  className="btn  btn-md btn-danger  rounded-0"
                >
                  Sold Out
                </Button>
              ) : (
                <Button
                  type="button"
                  className="btn  btn-md btn_blue  rounded-0"
                  onClick={handleClick}
                >
                  {btnText}
                </Button>
              )}
            </div>
          </Stack>
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Stickyfooter;
