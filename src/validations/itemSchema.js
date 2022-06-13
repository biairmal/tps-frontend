import * as yup from 'yup';

export const createItemSchema = yup.object().shape({
  code: yup
    .string()
    .required('Kode barang wajib diisi')
    .matches(
      '^[a-zA-Z0-9-_]*$',
      'Kode barang hanya boleh terdiri dari angka dan alfabet serta simbol "-_"'
    ),
  name: yup
    .string()
    .required('Nama barang wajib diisi')
    .matches('^[a-zA-Z0-9 ]*$', 'Nama barang hanya boleh terdiri dari angka dan alfabet'),
  description: yup.string().required('Deskripsi wajib diisi'),
  // picture: yup.string().required(),
  quantity: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Jumlah barang wajib diisi')
        .min(1, 'Jumlah barang harus lebih dari 1');
    else return yup.string().required('Jumlah barang harus diisi');
  }),
  cogs: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Modal penjualan wajib diisi')
        .min(1, 'Modal penjualan harus lebih dari 1');
    else return yup.string().required('Modal penjualan harus diisi');
  }),
  normalPrice: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Harga normal wajib diisi')
        .min(1, 'Harga normal harus lebih dari 1');
    else return yup.string().required('Harga normal harus diisi');
  }),
  dealerPrice: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Harga dealer wajib diisi')
        .min(1, 'Harga dealer harus lebih dari 1');
    else return yup.string().required('Harga dealer harus diisi');
  }),
  tax: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Pajak wajib diisi')
        .min(0, 'Minimal pajak 0')
        .max(100, 'Maksimal pajak 100');
    else return yup.string().required('Pajak harus diisi');
  }),
  discount: yup.lazy((value) => {
    value = parseInt(value, 10);
    if (value || value === 0)
      return yup
        .number()
        .required('Discount wajib diisi')
        .min(0, 'Minimal discount 0')
        .max(100, 'Maksimal pajak 100');
    else return yup.string().required('Discount harus diisi');
  })
});
