import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import usersAPI from 'api/usersAPI';
import { PasswordInput, SelectInput, SubmitButton, TextInput } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { createUserSchema } from 'validations/userSchema';

function CreateUserPage() {
  const roleOptions = [
    { option: 'Admin', value: 'admin' },
    { option: 'Dealer', value: 'dealer' },
    { option: 'Distributor', value: 'distributor' }
  ];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createUserSchema),
    mode: 'onTouched'
  });

  const snackbarRef = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (data) => {
    try {
      setIsLoading(true);
      const res = await usersAPI.createUser(data);
      setIsLoading(false);
      if (res.status === 201) {
        navigate('/users', { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Berhasil membuat pengguna!');
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
      if (error.response.status === 400) {
        console.log('Bad req');
      } else if (error.response.status === 409) {
        setError('username', { type: 'custom', message: 'Username already exists' });
      }
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Akun dan Pengguna</Heading>
      <SubHeading>Tambahkan Pengguna</SubHeading>

      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="max-w-lg space-y-4">
          <TextInput
            label="Username*"
            name="username"
            error={errors.username?.message}
            register={register}
            placeholder="Masukkan username..."
          />
          <PasswordInput
            label="Password*"
            name="password"
            error={errors.password?.message}
            register={register}
            placeholder="Masukkan password..."
          />
          <PasswordInput
            label="Konfirmasi Password*"
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            register={register}
            placeholder="Masukkan ulang password..."
          />
          <TextInput
            label="Nama Depan*"
            name="firstName"
            error={errors.firstName?.message}
            register={register}
            placeholder="Masukkan nama depan..."
          />
          <TextInput
            label="Nama Belakang"
            name="lastName"
            error={errors.lastName?.message}
            register={register}
            placeholder="Masukkan nama belakang..."
          />
          <SelectInput
            label="Role*"
            name="role"
            error={errors.role?.message}
            register={register}
            placeholder="Tentukan Role..."
            defaultValue={1}
            options={roleOptions}
          />
          <SubmitButton text="Tambahkan Pengguna" />
        </div>
      </form>
    </div>
  );
}

export default CreateUserPage;
