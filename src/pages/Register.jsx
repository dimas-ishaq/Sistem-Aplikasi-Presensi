
import { Container, Row, Col } from 'react-bootstrap';
import FormRegister from '../components/register/FormRegister';
import registerImage from '../assets/register.svg';
export default function Register() {
  return (
    <Container fluid>
      <Row className='align-items-center vh-100'>
        <Col>
          <div className="d-flex flex-column w-75">
            <img src={registerImage} className="img-fluid" alt="" />
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-column">
            <h1 className='text-center'>Sistem Aplikasi Presensi <br /> Berbasis Web</h1>
            <FormRegister />
          </div>
        </Col>
      </Row>
    </Container >
  );
}