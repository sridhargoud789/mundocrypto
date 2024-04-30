import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const CheckoutCartList = ({ item }) => {
  return (
    <Card className="noBorderCard">
      <CardHeader
        avatar={
          <img
            src={item.signed_url_image}
            //  src="https://mundocrypto-prod.s3.eu-central-1.amazonaws.com/M%C3%A1ster%20en%20Inteligencia%20Artificial%20-%20AI%20Mastery/url_image_mobile.jfif"
            width={60}
            onError={(e) => {
              e.currentTarget.src = "./images_optimized/noimage.png";
            }}
          />
        }
        action={
          <>
            <div className="pt-2">
              <span className="text-dark fw-bold">${item.price}</span>
            </div>
          </>
        }
        title={item.name}
      />
    </Card>
  );
};

export default CheckoutCartList;
