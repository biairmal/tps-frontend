import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username wajib diisi')
    .min(6, 'Minimal 6 karakter')
    .max(20, 'Maksimal 20 karakter')
    .matches('^[a-zA-Z0-9]*$', 'Username hanya boleh terdiri dari angka dan alfabet'),
  password: yup.string().required('Password wajib diisi').min(6, 'Minimal 6 karakter'),
  confirmPassword: yup
    .string()
    .required('Konfirmasi password wajib diisi')
    .oneOf([yup.ref('password'), null], 'Password tidak cocok'),
  firstName: yup
    .string()
    .required('Nama depan wajib diisi')
    .matches('^[a-zA-Z ]*$', 'Hanya boleh alfabet'),
  lastName: yup.string().matches('^[a-zA-Z ]*$', 'Hanya boleh alfabet'),
  role: yup
    .string()
    .required('Role wajib diisi')
    .oneOf(['admin', 'distributor', 'dealer'], 'Nilai invalid')
});

export const updateUserSchema = yup.object().shape({
  username: yup.lazy((value) => {
    if (value) {
      return yup
        .string()
        .min(6, 'Minimal 6 karakter')
        .max(20, 'Maksimal 20 karakter')
        .matches('^[a-zA-Z0-9]*$', 'Username hanya boleh terdiri dari angka dan alfabet');
    }
  }),
  password: yup.lazy((value) => {
    if (value) {
      return yup.string().min(6, 'Minimal 6 karakter');
    } else return yup.string().nullable().notRequired();
  }),
  confirmPassword: yup.string().when('password', {
    is: (value) => value?.length,
    then: yup.string().oneOf([yup.ref('password'), null], 'Password tidak cocok')
  }),
  firstName: yup
    .string()
    .required('Nama depan wajib diisi')
    .matches('^[a-zA-Z ]*$', 'Hanya boleh alfabet'),
  lastName: yup.lazy((value) => {
    if (value) {
      return yup.string().matches('^[a-zA-Z ]*$', 'Hanya boleh alfabet');
    } else return yup.string().nullable().notRequired();
  }),
  role: yup.string().oneOf(['admin', 'distributor', 'dealer'], 'Nilai invalid')
});
