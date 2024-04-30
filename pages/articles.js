import Chip from "@mui/material/Chip";
import i18 from "../next-i18next.config";

import _ from "lodash";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getALLArticles, getArticleTags } from "services/nodeapi";
import { GeeksSEO, PageHeading } from "widgets";
// import Web3 from "web3";
import { Box, Grid, Slider, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import { Check } from "@mui/icons-material";

const Articles = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [articles, setarticles] = useState([]);
  const { locale: activeLocale, locales, asPath } = useRouter();
  const [showLoading, setShowLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [articleTags, setArticleTags] = useState([]);
  const [selectedTags, setselectedTags] = useState([]);

  const [selectedBegLevel, setselectedBegLevel] = useState(false);
  const [selectedIntLevel, setselectedIntLevel] = useState(false);
  const [selectedAdvLevel, setselectedAdvLevel] = useState(false);

  const [selectedLevel, setSelectedLevel] = useState([]);
  const [durationvalue, setdurationvalue] = useState([1, 99]);

  useEffect(() => {
    pageLoad();
  }, [activeLocale]);

  const pageLoad = async () => {
    setShowLoading(true);
    const respTags = await getArticleTags();
    setArticleTags(respTags.data);

    const resp = await getALLArticles({ page: 1, limit: 9 });
    setarticles(resp.data.list);
    setShowLoading(false);
  };

  const loadArticles = async () => {
    setShowLoading(true);
    if (
      !_.isEmpty(selectedTags) ||
      !_.isEmpty(selectedLevel) ||
      !(durationvalue[0] === 1 && durationvalue[1] === 99)
    ) {
      let tags = "";
      let level = "";
      let duration = `${durationvalue[0]} and ${durationvalue[1]}`;
      if (!_.isEmpty(selectedTags)) {
        selectedTags.map((t) => {
          tags = tags + t.id + ",";
        });
        tags = tags.replace(/,\s*$/, "");
      }

      if (!_.isEmpty(selectedLevel)) {
        selectedLevel.map((t) => {
          level = level + t + ",";
        });
        level = level.replace(/,\s*$/, "");
      }

      const resp = await getALLArticles({
        page: 0,
        limit: 9,
        tags,
        level,
        duration,
      });
      setarticles([]);
      setarticles(resp.data.list);
      setShowLoading(false);
    } else {
      const resp = await getALLArticles({ page: pageNo + 1, limit: 9 });
      setPageNo(pageNo + 1);

      setarticles([...articles, ...resp.data.list]);
      setShowLoading(false);
    }
  };

  const handleTagsChange = async (obj) => {
    const exists = _.findIndex(selectedTags, function (t) {
      return t.id === obj.id;
    });
    if (exists === -1) {
      setselectedTags((oldArray) => [...oldArray, obj]);
    } else {
      setselectedTags(selectedTags.filter((t) => t.id !== obj.id));
    }
  };

  const handleLevelChange = async (id) => {
    const exists = _.findIndex(selectedLevel, function (t) {
      return t === id;
    });
    if (exists === -1) {
      setSelectedLevel((oldArray) => [...oldArray, id]);
    } else {
      setSelectedLevel(selectedLevel.filter((t) => t !== id));
    }
  };

  const handleDurationChange = async (event, newValue) => {
    setdurationvalue(newValue);
  };

  const resetFilters = async () => {
    await setselectedTags([]);
    await setSelectedLevel([]);
    await setdurationvalue([1, 99]);
    await setarticles([]);
    await loadArticles();
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const isTagSelected = (id) => {
    const exists = _.findIndex(selectedTags, function (t) {
      return t.id === id;
    });
    return exists === -1 ? false : true;
  };

  const isLevelSelected = (id) => {
    const exists = _.findIndex(selectedLevel, function (t) {
      return t === id;
    });
    return exists === -1 ? false : true;
  };

  return (
    <Fragment>
      {/* Geeks SEO settings  */}
      <GeeksSEO title="Articles | MundoCrypto" />

      {/* Page header */}
      <PageHeading bg="bg-black" pagetitle="Todos los artículos" />

      {/* Content */}
      <div className="py-6">
        <Container fluid="sm">
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <h3>Topic</h3>
                {!_.isEmpty(articleTags) &&
                  articleTags.map((a, i) => {
                    return (
                      <Chip
                        key={i}
                        icon={isTagSelected(a.id) ? <Check /> : <></>}
                        label={a.title_en}
                        variant={isTagSelected(a.id) ? "filled" : "outlined"}
                        className={"m-2"}
                        onClick={() => handleTagsChange(a)}
                      />
                    );
                  })}
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <h3> Nivel</h3>
                <Chip
                  icon={isLevelSelected(1) ? <Check /> : <></>}
                  label="Principiante"
                  variant="outlined"
                  className={isLevelSelected(1) ? "level1" : ""}
                  onClick={() => handleLevelChange(1)}
                />
                &nbsp;&nbsp;&nbsp;
                <Chip
                  icon={isLevelSelected(2) ? <Check /> : <></>}
                  label="Intermedio"
                  variant="outlined"
                  className={isLevelSelected(2) ? "level2" : ""}
                  onClick={() => handleLevelChange(2)}
                />
                &nbsp;&nbsp;&nbsp;
                <Chip
                  icon={isLevelSelected(3) ? <Check /> : <></>}
                  label="Avanzado"
                  variant="outlined"
                  className={isLevelSelected(3) ? "level3" : ""}
                  onClick={() => handleLevelChange(3)}
                />
                <br />
                <Box className="mt-6">
                  <h3>Tiempo de lectura</h3>
                  <Slider
                    aria-label="Always visible"
                    getAriaLabel={() => "Tiempo de lectura"}
                    value={durationvalue}
                    step={1}
                    onChange={handleDurationChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <Alert variant="light" className="d-flex justify-content-end ">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => loadArticles()}
                >
                  Aplicar filtros
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => resetFilters()}
                >
                  Resetear filtros
                </Button>{" "}
              </Alert>
            </Col>
          </Row>
          <Row className="mb-2">
            {!_.isEmpty(articles) &&
              activeLocale &&
              articles.map((a, i) => {
                return (
                  <>
                    <Col md={4} sm={12} className="mt-4" key={i}>
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
                            activeLocale === "en"
                              ? a.image_url_en
                              : a.image_url_es
                          }
                          title={
                            activeLocale === "en" ? a.title_en : a.title_es
                          }
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
                                    ? "Principiante"
                                    : a.level === 2
                                    ? "Intermedio"
                                    : "Avanzado"}
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
          {showLoading && (
            <Row>
              <Col md={4}>
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Box>
              </Col>
              <Col md={4}>
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Box>
              </Col>
              <Col md={4}>
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Box>
              </Col>
            </Row>
          )}
          <Row>
            <Col md={12}>
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={loadArticles}
                >
                  Carga más
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default Articles;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], i18)),
    },
  };
}
