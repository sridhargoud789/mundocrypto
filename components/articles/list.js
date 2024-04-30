import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Image, Row, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getALLArticles } from "services/nodeapi";
// import Web3 from "web3";

const ArticleList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [articles, setarticles] = useState([]);
  const { locale: activeLocale, locales, asPath } = useRouter();
  useEffect(() => {
    pageLoad();
  }, [activeLocale]);
  const pageLoad = async () => {
    const resp = await getALLArticles({ page: 1, limit: 9 });
    setarticles(resp.data.list);
  };
  return (
    <>
      <Row className="mb-6">
        {!_.isEmpty(articles) &&
          activeLocale &&
          articles.map((a, i) => {
            return (
              <>
                <Col md={4} sm={12} className="mt-4">
                  <Card
                    className="articleCard "
                    role="button"
                    onClick={() =>
                      router.push(
                        `/articles/${
                          activeLocale === "en" ? a.slug_en : a.slug_es
                        }`
                      )
                    }
                  >
                    <Image
                      style={{ maxHeight: 220, minWidth: 200 }}
                      src={
                        activeLocale === "en" ? a.image_url_en : a.image_url_es
                      }
                      title={activeLocale === "en" ? a.title_en : a.title_es}
                    />
                    <Card.Header
                      style={{ minHeight: 100 }}
                      className="noBorderCard h1CourseTitle"
                    >
                      <h4 className="h1CourseTitle">
                        {activeLocale === "en" ? a.title_en : a.title_es}
                      </h4>
                    </Card.Header>
                    <Card.Body>
                      <Stack direction="horizontal" gap={3}>
                        <div>
                          <Badge
                            className={`level${a.level} rounded rounded-2`}
                          >
                            <h4 style={{ marginBottom: "2%" }}>
                              {a.level === 1
                                ? "Beginner"
                                : a.level === 2
                                ? "Intermediate"
                                : "Advanced"}
                            </h4>
                          </Badge>
                        </div>
                        <div>
                          <h4>
                            {moment(a.published_on).format("MMM DD, YYYY")}
                          </h4>
                        </div>
                        <div>
                          <h4>
                            <i className="far fa-clock me-1"></i>&nbsp;
                            {a.duration}&nbsp;m
                          </h4>
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>
                </Col>
              </>
            );
          })}
      </Row>
    </>
  );
};

export default ArticleList;
