import { Button, Card } from "react-bootstrap";

const ScheduleCourse = () => {
  return (
    <Card
      style={{
        border: "1px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <Card.Header className="noBorderCard">
        <img src="/images_optimized/alarm.png" width={40} />
        &nbsp;<span className="sc-courseTitle">Schedule learning time</span>
      </Card.Header>
      <Card.Body className="ms-6">
        <Card.Text>
          Learning a little each day adds up. Research shows that students who
          make learning a habit are more likely to reach their goals. Set time
          aside to learn and get reminders using your learning scheduler.
        </Card.Text>
        <Button className="btn-dark-blue" size="sm">
          Get started
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="outline-dark" size="sm">
          Dismiss
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ScheduleCourse;
