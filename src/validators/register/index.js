import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^\S*$/, 'Username tidak boleh mengandung spasi')
    .required('Username is required'),
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
});

export const validateRegister = (formData) => {
  return registerSchema.validate(formData, { abortEarly: false });
}