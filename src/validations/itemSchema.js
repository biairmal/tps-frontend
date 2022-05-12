import * as yup from 'yup';

export const createItemSchema = yup.object().shape({
  code: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  // picture: yup.string().required(),
  quantity: yup.string().required(),
  cogs: yup.string().required(),
  normalPrice: yup.string().required(),
  dealerPrice: yup.string().required(),
  tax: yup.string().required(),
  discount: yup.string().required()
});
