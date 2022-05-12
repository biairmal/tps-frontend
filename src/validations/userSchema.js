import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required('Password wajib diisi'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Password tidak cocok'),
  firstName: yup.string().required('Nama depan wajib diisi'),
  lastName: yup.string(),
  role: yup.string().required('Role wajib diisi')
});

export const updateUserSchema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password tidak cocok'),
  firstName: yup.string(),
  lastName: yup.string(),
  role: yup.string()
});
