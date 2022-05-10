import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, SelectInput } from 'components/Forms';
import { createUserSchema } from 'validations/userSchema';
import usersAPI from 'api/usersAPI';
import { useContext } from 'react';
import { SnackbarContext } from 'context/SnackbarContext';
import { useNavigate } from 'react-router-dom';

function CreateUserPage() {
  const roleOptions = [
    { option: 'Admin', value: 'admin' },
    { option: 'Dealer', value: 'dealer' },
    { option: 'Distributor', value: 'distributor' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createUserSchema),
    mode: 'onTouched'
  });

  const snackbarRef = useContext(SnackbarContext);
  const navigate = useNavigate();

  const submitForm = async (data) => {
    try {
      const res = await usersAPI.createUser(data);
      if (res.status === 201) {
        navigate('/users', { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Berhasil membuat pengguna!');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-5xl text-sky-500 font-medium">Akun dan Pengguna</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Tambahkan Pengguna</h2>

        <div className="max-w-md flex flex-col">
          <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
            <TextInput
              label="Username*"
              name="username"
              error={errors.username?.message}
              register={register}
              placeholder="Masukkan username"
            />
            <TextInput
              label="Password*"
              name="password"
              error={errors.password?.message}
              register={register}
              placeholder="Masukkan password"
              type="password"
            />
            <TextInput
              label="Konfirmasi Password*"
              name="confirmPassword"
              error={errors.confirmPassword?.message}
              register={register}
              placeholder="Masukkan ulang password"
              type="password"
            />
            <TextInput
              label="Nama Depan*"
              name="firstName"
              error={errors.firstName?.message}
              register={register}
              placeholder="Masukkan nama depan"
            />
            <TextInput
              label="Nama Belakang"
              name="lastName"
              error={errors.lastName?.message}
              register={register}
              placeholder="Masukkan nama belakang"
            />
            <SelectInput
              label="Role"
              name="role"
              error={errors.role?.message}
              register={register}
              placeholder="Tentukan Role"
              defaultValue={1}
              options={roleOptions}
            />
            <div className="pt-4">
              <button type="submit" className="bg-sky-500 text-white py-2 px-4 rounded-md w-max">
                Tambahkan Pengguna
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUserPage;
