// import node module libraries
import Link from "next/link";
import { Card, Image, ListGroup, Stack } from "react-bootstrap";

// import widget/custom components

// import custom components
import Ratings from "widgets/ratings/Ratings";
// import utility file
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenValue } from "services/nodeapi";
import { userObject } from "services/states";
const SpecialPackCard = () => {
  const price = 1987;
  const router = useRouter();
  const userObj = useRecoilValue(userObject);
  const [isFav, setIsFav] = useState(false);
  const [mctPrice, setMCTPrice] = useState(null);

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = async () => {
    if (!_.isEmpty(localStorage.getItem("mctprice"))) {
      setMCTPrice(parseFloat(localStorage.getItem("mctprice")));
    } else {
      await loadMCTPrice();
    }
  };

  const loadMCTPrice = async () => {
    const resp = await tokenValue();

    if (resp.status === 200) {
      setMCTPrice(resp.data.data);
    }
  };
  return (
    <Card className={`mb-4 card-hover `}>
      <Link href={`PackageDetail/1`}>
        <a>
          <Image
            alt=""
            className="card-img-top rounded-top-md"
            src={"/images_optimized/paquete-de-navidad.png"}
          />
        </a>
      </Link>
      {/* Card body  */}
      <Card.Body>
        <h3 className="h4 mb-2" style={{ maxHeight: "3rem" }}>
          <Link href={`PackageDetail/1`}>
            <a className="text-inherit">OFERTA ESPECIAL - PACK DE CURSOS</a>
          </Link>
        </h3>
        <ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
          <ListGroup.Item as="li" bsPrefix="list-inline-item">
            <i className="far fa-clock me-1"></i>
            150 {"Horas"}
          </ListGroup.Item>
        </ListGroup>
        <div className={`lh-1 d-flex align-items-center`}>
          <span className="text-warning me-1 mb-1">
            {" "}
            <Ratings rating={5} />
          </span>
          <span className="text-warning me-1"> 5.0</span>
        </div>
        <Stack direction="horizontal" gap={2} className="mt-3">
          <div>
            <img
              src="/images_optimized/mclogo_price.svg"
              className="imgPrice_Coin"
              width="25px"
            />
          </div>
          <div>
            <span className="text-dark fw-bold">
              {parseFloat(price / mctPrice).toFixed(2)}
            </span>
            <small className="fs-6 text-muted"> / ${price}</small>
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default SpecialPackCard;
