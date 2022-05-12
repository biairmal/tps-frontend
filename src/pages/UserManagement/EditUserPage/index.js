import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, SelectInput } from 'components/Forms';
import { updateUserSchema } from 'validations/userSchema';
import usersAPI from 'api/usersAPI';
import { useContext, useEffect } from 'react';
import { SnackbarContext } from 'context/SnackbarContext';
import { useNavigate, useParams } from 'react-router-dom';

function CreateUserPage() {
  const roleOptions = [
    { option: 'Admin', value: 'admin' },
    { option: 'Dealer', value: 'dealer' },
    { option: 'Distributor', value: 'distributor' }
  ];

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(updateUserSchema),
    mode: 'onTouched'
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const snackbarRef = useContext(SnackbarContext);

  const fetchData = async (id) => {
    const res = await usersAPI.getUserById(id);
    reset(res.data.data);
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  const submitForm = async (data) => {
    const updateData = {};

    if (Object.keys(dirtyFields).length < 1) {
      return snackbarRef.current.error('Mohon update data terlebih dahulu!');
    }

    Object.keys(dirtyFields).map((field) => (updateData[field] = data[field]));

    try {
      const res = await usersAPI.updateUser(id, updateData);

      if (res.status === 200) {
        navigate('/users', { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Berhasil memperbaharui pengguna!');
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        error.response.data.errors.map((field) =>
          setError(field.param, { type: 'custom', message: field.msg })
        );
      } else console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-5xl text-sky-500 font-medium">Akun dan Pengguna</h1>

      <div className="mt-12 flex flex-col space-y-8">
        <h2 className="text-2xl">Edit Pengguna</h2>

        <div className="max-w-md flex flex-col">
          <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
            <TextInput
              label="Username"
              name="username"
              error={errors.username?.message}
              register={register}
              placeholder="Masukkan username"
              disabled={true}
            />
            <TextInput
              label="Password"
              name="password"
              error={errors.password?.message}
              register={register}
              placeholder="Masukkan password"
              type="password"
            />
            <TextInput
              label="Konfirmasi Password"
              name="confirmPassword"
              error={errors.confirmPassword?.message}
              register={register}
              placeholder="Masukkan ulang password"
              type="password"
            />
            <TextInput
              label="Nama Depan"
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
              <button
                type="submit"
                className="bg-sky-500 text-white py-2 px-4 rounded-md w-max disabled:bg-opacity-50"
              >
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
