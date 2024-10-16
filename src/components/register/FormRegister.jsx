
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../validators/register";
import { registerThunk } from "../../redux/api";

export default function FormRegister() {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'Staff'
  })

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      await validateRegister(formData);
      const { payload } = await dispatch(registerThunk(formData));
      setErrors({});
      if (payload !== undefined) {
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors = {};
        err.inner.forEach(error => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      }
    }
  }
  return (
    <Form onSubmit={handleSubmitRegister}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nama</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={formData.name} isInvalid={!!errors.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={formData.username} isInvalid={!!errors.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={formData.password} isInvalid={!!errors.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form >
  )
}