
import { Container, Row, Col } from 'react-bootstrap';
import login from '../assets/login.svg';
import FormLogin from '../components/login/FormLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { getNewAccessTokenThunk } from '../redux/api';

export default function Login() {
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getNewAccessTokenThunk());
    if (isAuthenticated) {
      navigate('/staff/home')
    }
  }, [isAuthenticated]);

  return (
    <Container fluid>
      {loading ?
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <Spinner animation="border" />
        </div>
        :
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