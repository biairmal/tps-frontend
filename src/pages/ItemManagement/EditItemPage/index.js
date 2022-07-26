import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import itemsAPI from 'api/itemsAPI';
import { ImageInput, NumberInput, SubmitButton, TextInput, TextAreaInput } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { createItemSchema } from 'validations/itemSchema';

function EditItemPage() {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    watch,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(createItemSchema),
    mode: 'onTouched'
  });

  const watchImage = watch('picture');

  const { id } = useParams();
  const navigate = useNavigate();
  const snackbarRef = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id) => {
    const res = await itemsAPI.getItemById(id);
    reset(res.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(id);
  }, []);

  const submitForm = async (data) => {
    try {
      const updateData = new FormData();

      if (Object.keys(dirtyFields).length < 1) {
        return snackbarRef.current.error('Mohon update data terlebih dahulu!');
      }

      Object.keys(dirtyFields).map((field) => {
        if (field === 'picture') {
          const uploadedImage = data.picture.length > 0 ? data.picture[0] : undefined;
          if (uploadedImage) updateData.append('picture', uploadedImage);
        }
        updateData.append(field, data[field]);
      });

      setIsLoading(true);
      const res = await itemsAPI.updateItem(id, updateData);
      setIsLoading(false);

      if (res.status === 200) {
        navigate('/items', { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Berhasil memperbaharui data barang!');
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 400) {
        error.response.data.errors.map((field) =>
          setError(field.param, { type: 'custom', message: field.msg })
        );
      } else if (error.response.status === 409) {
        setError('code', { type: 'custom', message: 'Code already exists' });
      }
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Manajemen Barang</Heading>
      <SubHeading>Edit Barang</SubHeading>

      {isLoading && <Loader />}

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
        <SubmitButton text="Simpan" />
      </form>
    </div>
  );
}

export default EditItemPage;
