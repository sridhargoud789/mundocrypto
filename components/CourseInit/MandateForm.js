/* eslint-disable */
// import node module libraries

import { Button, Col, Form, Row } from "react-bootstrap";

// import MDI icons

// import widget/custom components
// import sub components

// import data files
// import hooks

const MandateForm = ({
  isEmployee_Company,
  mandateformvalidated,
  handleMandateFormSubmit,
  data,
}) => {
  return (
    <Form
      noValidate
      validated={mandateformvalidated}
      onSubmit={handleMandateFormSubmit}
    >
      {isEmployee_Company === 1 ? (
        <>
          {data.option1.map((q, i) => {
            return (
              <Row key={i} className="mb-3">
                <Col md={12} sm={12} className="mb-4">
                  <Form.Group controlId={`validationCustom${i}`}>
                    <Form.Label>
                      {i + 1}.&nbsp;{q}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name={q}
                      placeholder={"Por favor ingrese una respuesta válida"}
                    />
                  </Form.Group>
                </Col>
              </Row>
            );
          })}
        </>
      ) : (
        <>
          {data.option2.map((q, i) => {
            return (
              <Row key={i} className="mb-3">
                <Col md={12} sm={12} className="mb-4">
                  <Form.Group controlId={`validationCustom${i}`}>
                    <Form.Label>
                      {i + 1}.&nbsp;{q}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name={q}
                      placeholder={"Por favor ingrese una respuesta válida"}
                    />
                  </Form.Group>
                </Col>
              </Row>
            );
          })}
        </>
      )}
      <Row>
        <Col md={12} sm={12}>
          <Button type="submit" size="sm" className="float-end mb-4">
            Enviar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MandateForm;
