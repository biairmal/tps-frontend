import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitButton, TextInput, TextAreaInput, NumberInput } from 'components/Forms';
import { createItemSchema } from 'validations/itemSchema';
import itemsAPI from 'api/itemsAPI';
import { useContext } from 'react';
import { SnackbarContext } from 'context/SnackbarContext';
import { useNavigate } from 'react-router-dom';

function CreateItemPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createItemSchema),
    mode: 'onTouched'
  });

  const snackbarRef = useContext(SnackbarContext);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      const res = await itemsAPI.createItem(data);
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
    <>
      <h1 className="text-5xl text-sky-500 font-medium">Manajemen Barang</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Tambahkan Barang</h2>

        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-row w-full space-x-16">
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
            <div className="flex-1 max-w-md space-y-4">
              <div className="font-medium">Foto Produk</div>
              <div className="w-full aspect-video bg-gray-100 rounded-lg"></div>
              <label className="mt-4 block border-2 rounded-lg">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-l-md file:border-0
                file:text-sm file:font-semibold
                file:bg-sky-500 file:text-white
                hover:file:bg-sky-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                focus:rounded-lg
                "
                />
              </label>
              <TextAreaInput
                label="Deskripsi"
                name="description"
                error={errors.description?.message}
                register={register}
                placeholder="Masukkan deskripsi..."
              />
            </div>
          </div>
          <div className="pt-4">
            <SubmitButton text="Tambahkan Barang" />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateItemPage;
