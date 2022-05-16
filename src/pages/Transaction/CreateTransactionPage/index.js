import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import itemsAPI from 'api/itemsAPI';
import { NumberInput, SelectInput, SubmitButton, TextInput } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { createUserSchema } from 'validations/userSchema';
import ItemCombobox from './ItemCombobox';

function CreateTransactionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    // resolver: yupResolver(createUserSchema),
    mode: 'onTouched'
  });

  const snackbarRef = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (data) => {
    try {
      console.log(data);
      // setIsLoading(true);
      // const res = await usersAPI.createUser(data);
      // setIsLoading(false);
      // if (res.status === 201) {
      //   navigate('/users', { replace: true });
      //   setTimeout(() => {
      //     snackbarRef.current.success('Berhasil membuat pengguna!');
      //   }, 1000);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // buyer: name, phone, email, zip, address, city, country

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Panel Transaksi</Heading>
      <SubHeading>Buat Transaksi</SubHeading>

      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(submitForm)} className="space-y-8">
        <div className="max-w-xl space-y-2">
          <h3 className="text-xl font-medium text-sky-500 mb-4">Data Pembeli</h3>
          <TextInput
            label="Nama Pembeli*"
            name="name"
            error={errors.name?.message}
            register={register}
            placeholder="Masukkan nama pembeli..."
          />
          <div className="flex justify-between space-x-2">
            <TextInput
              label="Nomor Telepon*"
              name="phone"
              error={errors.phone?.message}
              register={register}
              placeholder="Masukkan nomor telepon..."
            />
            <TextInput
              label="E-mail"
              name="email"
              error={errors.email?.message}
              register={register}
              placeholder="Masukkan alamat e-mail..."
            />
          </div>
          <TextInput
            label="Alamat"
            name="address"
            error={errors.address?.message}
            register={register}
            placeholder="Masukkan alamat pembeli..."
          />
          <div className="flex justify-between space-x-2">
            <TextInput
              label="Kode Pos"
              name="zip"
              error={errors.zip?.message}
              register={register}
              placeholder="Masukkan kode pos..."
            />
            <TextInput
              label="Kota"
              name="city"
              error={errors.city?.message}
              register={register}
              placeholder="Masukkan kota asal..."
            />
            <TextInput
              label="Negara"
              name="country"
              error={errors.country?.message}
              register={register}
              placeholder="Masukkan negara asal..."
            />
          </div>
          <SelectInput
            label="Tipe Customer"
            name="customerType"
            error={errors.customerType?.message}
            register={register}
            placeholder="Tentukan Tipe Harga..."
            defaultValue={'customer'}
            options={[
              { option: 'Customer', value: 'customer' },
              { option: 'Dealer', value: 'dealer' }
            ]}
          />
        </div>
        <div className="max-w-xl space-y-2">
          <h3 className="text-xl font-medium text-sky-500 mb-4">Tambahkan Produk</h3>
          <div className="flex flex-row w-full justify-between space-x-2">
            <ItemCombobox />
            <NumberInput
              error={errors.quantity?.message}
              label="Jumlah*"
              min={0}
              name="quantity"
              placeholder="Masukkan jumlah..."
              register={register}
              type="number"
            />
          </div>
        </div>

        <SubmitButton text="Tambahkan Pengguna" />
      </form>
    </div>
  );
}

export default CreateTransactionPage;
