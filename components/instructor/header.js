import { ListGroup } from "react-bootstrap";
import { CheckCircle } from "react-feather";
const InstructorHeader = () => {
  return (
    <div className="mb-4 mb-xl-0 text-center text-md-start">
      {/*  Caption  */}
      <h4 className="display-4 fw-bold mb-3 text-black ls-sm">
        Conviértete en profesor y obtén recompensas en nuestra comunidad de
        instructores
      </h4>
      <p className="mb-4 lead text-black-50">
        Enseña como profesor y vive de lo que te apasiona.
      </p>
      {/*  List  */}
      <h4 className="fw-bold mb-3 text-black fs-16">
        Ventajas de ser profesor en Mundo Crypto
      </h4>
      <div className="mb-6 mb-0">
        <ListGroup bsPrefix="list-unstyled fs-4 ">
          <ListGroup.Item bsPrefix="mb-2 text-black-50">
            <span className="me-2 ">
              <CheckCircle size="18" className="me-1 text-primary" />
            </span>
            <span className="align-top">
              Publica tu curso de forma fácil e independiente
            </span>
          </ListGroup.Item>
          <ListGroup.Item bsPrefix="mb-2 text-black-50">
            <span className="me-2 ">
              <CheckCircle size="18" className="me-1 text-primary" />
            </span>
            <span className="align-top">
              Transmite e inspira con tu conocimiento a los estudiantes
            </span>
          </ListGroup.Item>
          <ListGroup.Item bsPrefix="mb-2 text-black-50">
            <span className="me-2 ">
              <CheckCircle size="18" className="me-1 text-primary" />
            </span>
            <span className="align-top">
              Consigue recompensas enseñando a tus alumnos
            </span>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default InstructorHeader;
