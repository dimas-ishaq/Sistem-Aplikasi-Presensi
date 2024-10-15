
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { validateLogin } from "../../validators/login";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
export default function FormLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await validateLogin(formData);
      await dispatch(loginThunk(formData));
      setErrors({});
      navigate('/staff/home')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors = {};
        err.inner.forEach(error => {
          formErrors[error.path] = error.message; // Simpan pesan error berdasarkan path
        });
        setErrors(formErrors); // Simpan error ke state
      }
    }
  }

  return (
    <Form onSubmit={handleSubmitLogin}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={formData.username} isInvalid={!!errors.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={formData.password}
          isInvalid={!!errors.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" >
        Log In
      </Button>
    </Form >
  )

}