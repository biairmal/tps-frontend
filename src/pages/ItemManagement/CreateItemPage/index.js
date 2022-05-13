import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ImageInput, NumberInput, SubmitButton, TextInput, TextAreaInput } from 'components/Forms';
import { createItemSchema } from 'validations/itemSchema';
import itemsAPI from 'api/itemsAPI';
import { useContext } from 'react';
import { SnackbarContext } from 'context/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import { Heading, SubHeading } from 'components/Text';

function CreateItemPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createItemSchema),
    mode: 'onTouched'
  });

  const watchImage = watch('picture');

  const snackbarRef = useContext(SnackbarContext);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      const uploadedImage = data.picture ? data.picture[0] : undefined;
      const itemForm = document.getElementById('item_form');
      const formData = new FormData(itemForm);
      formData.set('picture', uploadedImage);

      const res = await itemsAPI.createItem(formData);
      if (res.status === 201) {
        navigate('/items', { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Berhasil membuat barang!');
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Manajemen Barang</Heading>
      <SubHeading>Tambahkan Barang</SubHeading>

      <form id="item_form" onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col xl:flex-row w-full space-y-4 xl:space-y-0 xl:space-x-16 mb-8">
          {/* Left content */}
          <div className="space-y-4 flex-1 max-w-lg">
            <TextInput
              error={errors.code?.message}
              label="Kode Barang*"
              name="code"
              placeholder="Masukkan kode barang..."
              register={register}
            />
            <TextInput
              error={errors.name?.message}
              label="Nama Barang*"
              name="name"
              placeholder="Masukkan nama barang..."
              register={register}
            />
            <NumberInput
              error={errors.quantity?.message}
              label="Jumlah*"
              min={0}
              name="quantity"
              placeholder="Masukkan jumlah..."
              register={register}
              type="number"
            />
            <NumberInput
              error={errors.cogs?.message}
              label="Modal penjualan*"
              min={0}
              name="cogs"
              placeholder="Masukkan modal penjualan..."
              register={register}
              type="number"
            />
            <NumberInput
              error={errors.normalPrice?.message}
              label="Harga Normal*"
              min={0}
              name="normalPrice"
              placeholder="Masukkan harga normal..."
              register={register}
            />
            <NumberInput
              error={errors.dealerPrice?.message}
              label="Harga Dealer*"
              min={0}
              name="dealerPrice"
              placeholder="Masukkan harga dealer..."
              register={register}
            />
            <NumberInput
              error={errors.tax?.message}
              label="Pajak"
              max={100}
              min={0}
              name="tax"
              placeholder="Masukkan pajak... (%)"
              register={register}
            />
            <NumberInput
              error={errors.discount?.message}
              label="Discount"
              max={100}
              min={0}
              name="discount"
              placeholder="Masukkan discount... (%)"
              register={register}
            />
          </div>
          {/* Right content */}
          <div className="flex-1 max-w-md space-y-4">
            <ImageInput
              label="Foto Produk"
              name="picture"
              register={register}
              watchImage={watchImage}
            />

            <TextAreaInput
              label="Deskripsi"
              name="description"
              error={errors.description?.message}
              register={register}
              placeholder="Masukkan deskripsi..."
            />
          </div>
        </div>
        <SubmitButton text="Tambahkan Barang" />
      </form>
    </div>
  );
}

export default CreateItemPage;
