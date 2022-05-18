import * as yup from 'yup';

export const createBuyerSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  address: yup.string().required(),
  zip: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  customerType: yup.string().required()
});

export const addItemToCartSchema = yup.object().shape({
  item: yup.object().required(),
  quantity: yup.number().required()
});
