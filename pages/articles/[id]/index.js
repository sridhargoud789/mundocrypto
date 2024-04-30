import { mdiFacebook, mdiInstagram, mdiTwitter } from "@mdi/js";
import Icon from "@mdi/react";
import _ from "lodash";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Badge, Card, Col, Container, Nav, Row, Stack } from "react-bootstrap";
import * as Scroll from "react-scroll";
import {
  getALLArticles,
  getArticleTags,
  getArticledetailsBySlug,
} from "services/nodeapi";
import { GeeksSEO } from "widgets";
import i18 from "../../../next-i18next.config";

const ArticlesDetails = (props) => {
  const router = useRouter();
  const { locale: activeLocale, locales, asPath } = useRouter();

  const [articleDetails, setarticleDetails] = useState([]);

  const [otherArticles, setotherArticles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [articletags, setarticletags] = useState([]);

  useEffect(() => {
    if (router.query.id) {
      pageLoad();
    }
  }, [router, activeLocale]);

  const pageLoad = async () => {
    // const language =
    //   localStorage.getItem("language_code") === "en" ? "en" : "es";
    const slug = router.query.id;

    const resp = await getArticledetailsBySlug({ slug });
    const data = resp.data.list[0];
    setarticleDetails(data);
    const currentArticleId = data.id;
    const upNextMaxArticleId = currentArticleId + 5;
    const allArtResp = await getALLArticles({ page: 1, limit: 200 });
    const furtherData = [];
    allArtResp.data.list.map((d, i) => {
      if (d.id > currentArticleId && d.id <= upNextMaxArticleId) {
        furtherData.push(d);
      }
    });

    setotherArticles(furtherData);

    const _selectedTags = data.tag_ids === "" ? [] : data.tag_ids.split(",");
    const tagsResp = await getArticleTags();

    const tagsOBJ = [];

    _selectedTags.map((t) => {
      const ft = _.filter(tagsResp.data, {
        id: parseInt(t),
      });
      tagsOBJ.push(ft[0]);
    });

    setarticletags(tagsOBJ);
  };
  return (
    <Fragment>
      {/* {!_.isEmpty(articleDetails) && JSON.stringify(articleDetails)}
      -------------------------------------------------------------------------
      {!_.isEmpty(articletags) && JSON.stringify(articletags)} */}
      {!_.isEmpty(articleDetails) && activeLocale && (
        <>
          <GeeksSEO title={articleDetails.title_en} />
          {/* <PageHeading bg="bg-black" pagetitle={articleDetails.title_en} /> */}
          <div className="py-6">
            <Container>
              <Row>
                <Col md={9} sm={12} className="article-details-main">
                  <Card className="noBorderCard">
                    <Card.Header className="noBorderCard pb-4">
                      <Stack gap={2} direction="horizontal">
                        {!_.isEmpty(articletags) &&
                          articletags.map((d, i) => {
                            return (
                              <Badge
                                pill
                                bg="dark"
                                key={i}
                                style={{ fontSize: "16px" }}
                              >
                                {d.title_en}
                              </Badge>
                            );
                          })}
                      </Stack>
                    </Card.Header>

                    <Card.Body>
                      <img
                        style={{ borderRadius: "16px" }}
                        src={
                          activeLocale === "en"
                            ? articleDetails.image_url_en
                            : articleDetails.image_url_es
                        }
                        width={"100%"}
                      />
                      <Card.Title className="article-modules-title pb-2 pt-4">
                        #{articleDetails.article_number}&nbsp;
                        {activeLocale === "en"
                          ? articleDetails.title_en
                          : articleDetails.title_es}
                      </Card.Title>
                      <Stack direction="horizontal" gap={6}>
                        <div>
                          <Badge
                            className={`level${articleDetails.level} rounded rounded-2`}
                          >
                            <h4 style={{ marginBottom: "2%" }}>
                              {" "}
                              {articleDetails.level === 1
                                ? "Beginner"
                                : articleDetails.level === 2
                                ? "Intermediate"
                                : "Advanced"}
                            </h4>
                          </Badge>
                        </div>
                        <div>
                          <h4>
                            {moment(articleDetails.published_on).format(
                              "MMM DD, YYYY"
                            )}
                          </h4>
                        </div>
                        <div>
                          <h4>
                            <i className="far fa-clock me-1"></i>&nbsp;
                            {articleDetails.duration}&nbsp;m
                          </h4>
                        </div>
                      </Stack>
                      <Card className="noBorderCard pt-4">
                        <Card.Header className="noBorderCard">
                          <h4 className="article-modules-title">
                            {" "}
                            {activeLocale === "en"
                              ? articleDetails.content_title_en
                              : articleDetails.content_title_es}
                          </h4>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col md={12} sm={12}>
                              <p
                                className="articeFont"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    activeLocale === "en"
                                      ? articleDetails.content_description_en
                                      : articleDetails.content_description_es,
                                }}
                              ></p>
                            </Col>
                          </Row>
                          <div
                            data-bs-spy="scroll"
                            data-bs-target="#navbar-example"
                            data-bs-offset="0"
                          >
                            {!_.isEmpty(articleDetails.modules) &&
                              articleDetails.modules.map((m, i) => {
                                return (
                                  <Row key={i} id={`scrollnav-${m.id}`}>
                                    <Col md={12} sm={12}>
                                      <h4 className="article-modules-title">
                                        {activeLocale === "en"
                                          ? m.title_en
                                          : m.title_es}
                                      </h4>
                                      {!_.isEmpty(
                                        activeLocale === "en"
                                          ? m.content_en
                                          : m.content_es
                                      ) &&
                                        JSON.parse(
                                          activeLocale === "en"
                                            ? m.content_en
                                            : m.content_es
                                        ).map((c, j) => {
                                          return (
                                            <Card
                                              className="noBorderCard"
                                              key={j}
                                            >
                                              <Card.Body>
                                                <Row>
                                                  <Col md={12} sm={12}>
                                                    <p
                                                      className="articeFont"
                                                      dangerouslySetInnerHTML={{
                                                        __html: c.cd,
                                                      }}
                                                    ></p>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  {!_.isEmpty(
                                                    c.selectedFiles
                                                  ) &&
                                                    c.selectedFiles.map(
                                                      (f, k) => {
                                                        return (
                                                          <Col
                                                            key={k}
                                                            md={
                                                              c.selectedFiles
                                                                .length === 3
                                                                ? "4"
                                                                : c
                                                                    .selectedFiles
                                                                    .length ===
                                                                  2
                                                                ? "6"
                                                                : 12
                                                            }
                                                            sm={12}
                                                          >
                                                            <img
                                                              src={f}
                                                              width={300}
                                                              className="img-fluid"
                                                            />
                                                          </Col>
                                                        );
                                                      }
                                                    )}
                                                </Row>
                                              </Card.Body>
                                            </Card>
                                          );
                                        })}
                                    </Col>
                                  </Row>
                                );
                              })}
                            <Row id={`scrollnav-fr`}>
                              <Col md={12} sm={12}>
                                <h4 className="article-modules-title">
                                  Further Reading
                                </h4>
                                {!_.isEmpty(otherArticles) &&
                                  otherArticles.map((o, i) => {
                                    return (
                                      <>
                                        {" "}
                                        <Link
                                          href={`/articles/${
                                            activeLocale === "en"
                                              ? o.slug_en
                                              : o.slug_es
                                          }`}
                                        >
                                          <a className="articles-fr-link mb-4">
                                            #{o.article_number}&nbsp;&nbsp;
                                            {activeLocale === "en"
                                              ? o.title_en
                                              : o.title_es}
                                          </a>
                                        </Link>
                                        <br />
                                        <br />
                                      </>
                                    );
                                  })}
                              </Col>
                            </Row>
                          </div>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} sm={12} className="article-right-col">
                  <Card className="noBorderCard">
                    <Card.Header className="noBorderCard">
                      <h4 className="fw-bold display-6">Share Posts</h4>
                    </Card.Header>
                    <Card.Body className="pt-0">
                      <Row>
                        <Col md={12} sm={12}>
                          <div className="mt-2">
                            {/* social media */}

                            <div className="fs-4 mt-2">
                              <Link href="https://twitter.com/MundoCrypto_ES">
                                <a
                                  className="text-dark text-primary-hover me-3"
                                  target="_blank"
                                >
                                  <Icon path={mdiTwitter} size={1} />
                                </a>
                              </Link>
                              <Link href="https://www.facebook.com/mundocryptooficial/">
                                <a
                                  className="text-dark text-primary-hover me-3"
                                  target="_blank"
                                >
                                  <Icon path={mdiFacebook} size={1} />
                                </a>
                              </Link>
                              <Link href="https://www.instagram.com/mundocryptooficial/">
                                <a
                                  className="text-dark text-primary-hover me-3"
                                  target="_blank"
                                >
                                  <Icon path={mdiInstagram} size={1} />
                                </a>
                              </Link>
                              <Link href="https://discord.gg/mundocryptocommunity">
                                <a
                                  className="text-dark text-primary-hover me-3"
                                  style={{
                                    marginTop: "-0.8rem",
                                    marginLeft: "-0.5rem",
                                  }}
                                  target="_blank"
                                >
                                  <img
                                    className="text-dark text-primary-hover "
                                    src="/images_optimized/discord.svg"
                                    width={50}
                                  />
                                </a>
                              </Link>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: "0px" }}>
                        <Col md={12} sm={12} style={{ paddingLeft: "0px" }}>
                          <Nav variant="underline" id="navbar-example">
                            {!_.isEmpty(articleDetails.modules) &&
                              articleDetails.modules.map((m, i) => {
                                return (
                                  <Nav.Item key={i}>
                                    <Nav.Link
                                      href={`#scrollnav-${m.id}`}
                                      onSelect={() =>
                                        Scroll.scrollTo(`#scrollnav-${m.id}`, {
                                          smooth: true,
                                          offset: -70,
                                          duration: 500,
                                        })
                                      }
                                    >
                                      <div className="bn-item-tail"></div>
                                      <div className="bn-item-icon-container css-vurnku">
                                        <div className="css-1ptkdsm"></div>
                                      </div>
                                      <div className="bn-item-content css-vurnku">
                                        <div
                                          data-bn-type="text"
                                          className="css-19memkk articleTimelineTitle"
                                        >
                                          <span>
                                            {activeLocale === "en"
                                              ? m.title_en
                                              : m.title_es}
                                          </span>
                                        </div>
                                      </div>
                                    </Nav.Link>
                                  </Nav.Item>
                                );
                              })}
                            <Nav.Item>
                              <Nav.Link
                                href={`#scrollnav-fr`}
                                onSelect={() =>
                                  Scroll.scrollTo(`#scrollnav-fr`, {
                                    smooth: true,
                                    offset: -70,
                                    duration: 500,
                                  })
                                }
                              >
                                <div className="bn-item-tail"></div>
                                <div className="bn-item-icon-container css-vurnku">
                                  <div className="css-2ptkdsm"></div>
                                </div>
                                <div className="bn-item-content css-vurnku">
                                  <div
                                    data-bn-type="text"
                                    className="css-19memkk articleTimelineTitle"
                                  >
                                    <span>Further Readings</span>
                                  </div>
                                </div>
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} sm={12}>
                          <Card
                            className="noBorderCard "
                            style={{ paddingLeft: "0px" }}
                          >
                            <Card.Header
                              className="noBorderCard"
                              style={{ paddingLeft: "0px" }}
                            >
                              <h4 className="fw-bold display-6">
                                Related Articles
                              </h4>
                            </Card.Header>
                          </Card>
                          {!_.isEmpty(otherArticles) &&
                            otherArticles.map((o, i) => {
                              return (
                                <>
                                  <Card
                                    role="button"
                                    onClick={() =>
                                      router.push(
                                        `/articles/${
                                          activeLocale === "en"
                                            ? o.slug_en
                                            : o.slug_es
                                        }`
                                      )
                                    }
                                    className="noBorderCard pb-4 rounded-4 "
                                  >
                                    <img
                                      src={
                                        activeLocale === "en"
                                          ? o.image_url_en
                                          : o.image_url_es
                                      }
                                      width={200}
                                      className=" rounded-4"
                                    />
                                    <Card.Title
                                      className="pt-2 fw-bold"
                                      style={{ width: "200px" }}
                                    >
                                      #{o.article_number}&nbsp;
                                      {activeLocale === "en"
                                        ? o.title_en
                                        : o.title_es}
                                    </Card.Title>
                                  </Card>
                                </>
                              );
                            })}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>{" "}
        </>
      )}
    </Fragment>
  );
};
export default ArticlesDetails;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
