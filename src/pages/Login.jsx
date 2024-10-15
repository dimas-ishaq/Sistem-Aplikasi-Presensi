
import { Container, Row, Col } from 'react-bootstrap';
import login from '../assets/login.svg';
import FormLogin from '../components/login/FormLogin';
export default function Login() {
  return (
    <Container fluid>
      <Row className='align-items-center vh-100'>
        <Col md={12} lg={6}>
          <div className="text-center">
            <img src={login} alt="login-image" className='img-fluid ' />
          </div>
        </Col>
        <Col className='p-3 p-lg-5' md={12} lg={6}>
          <Row>
            <h1 className='text-center'>Sistem Aplikasi Presensi <br /> Berbasis Web</h1>
          </Row>
          <Row className='mt-5'>
            <FormLogin />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}