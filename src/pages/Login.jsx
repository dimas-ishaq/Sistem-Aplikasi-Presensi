
import { Container, Row, Col } from 'react-bootstrap';
import login from '../assets/login.svg';
import FormLogin from '../components/login/FormLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) {
        navigate('/staff/home');
      }

    }
    fetchUser();
    // 
  }, []);

  return (
    <Container fluid>
      {loading ? <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> :
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
      }
    </Container>
  )
}