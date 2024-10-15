import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export const validateLogin = (formData) => {
  return loginSchema.validate(formData, { abortEarly: false })
}