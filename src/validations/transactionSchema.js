import * as yup from 'yup';

export const createBuyerSchema = yup.object().shape({
  name: yup.string().required('Nama Pembeli wajib diisi'),
  phone: yup.string().required('Nomor Telepon wajib diisi'),
  email: yup.string().required('Email wajib diisi'),
  address: yup.string().nullable().notRequired(),
  zip: yup.string().nullable().notRequired(),
  city: yup.string().nullable().notRequired(),
  country: yup.string().nullable().notRequired(),
  customerType: yup
    .string()
    .required('Tipe customer wajib diisi')
    .oneOf(['customer', 'dealer'], 'Invalid input')
});

export const addItemToCartSchema = yup.object().shape({
  item: yup.object().required('Item wajib diisi'),
  quantity: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Jumlah barang wajib diisi')
        .min(1, 'Jumlah barang harus lebih dari 1');
    else return yup.string().required('Jumlah barang harus diisi');
  })
});
