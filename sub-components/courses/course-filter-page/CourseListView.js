// import node module libraries
import { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";

// import widget/custom components
import { CourseCard } from "widgets";

// import data files
import { AllCoursesData } from "data/slider/AllCoursesData";

const CourseListView = (props) => {
  const [Records] = useState(AllCoursesData.slice(0, 500));

  // paging start
  const [pageNumber, setPageNumber] = useState(0);
  const RecordsPerPage = 6;
  const pagesVisited = pageNumber * RecordsPerPage;
  const pageCount = Math.ceil(Records.length / RecordsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const deleteFromCart = (id) => {};
  const displayRecords = props.cObj.map((Records, index) => {
    return (
      <Col sm={12} md={12} lg={12} key={index}>
        <CourseCard
          item={Records}
          viewby="list"
          deleteFromCart={deleteFromCart}
        />
      </Col>
    );
  });
  // end of paging

  return (
    <Fragment>
      <Row>
        {displayRecords.length > 0 ? (
          displayRecords
        ) : (
          <Col>No matching records found.</Col>
        )}
      </Row>
    </Fragment>
  );
};
export default CourseListView;
