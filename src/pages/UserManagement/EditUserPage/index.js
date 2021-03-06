//
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import usersAPI from 'api/usersAPI';
import { SelectInput, SubmitButton, TextInput } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import { Heading, SubHeading } from 'components/Text';
import { SnackbarContext } from 'context/SnackbarContext';
import { updateUserSchema } from 'validations/userSchema';

function EditUserPage() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchData = async (id) => {
    const res = await usersAPI.getUserById(id);
    reset(res.data.data);
    setIsLoading(false);
    setSelectedRole(res.data.data.role);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData(id);
  }, []);

  const submitForm = async (data) => {
    try {
      const updateData = {};

      if (Object.keys(dirtyFields).length) {
        Object.keys(dirtyFields).map((field) => {
          if (data[field] || ['lastName'].includes(field)) updateData[field] = data[field];
        });
      } else {
        return snackbarRef.current.error('Mohon update data terlebih dahulu!');
      }

      setIsLoading(true);
      const res = await usersAPI.updateUser(id, updateData);
      setIsLoading(false);

      if (res.status === 200) {
        navigate('/users', { replace: true });
        setTimeout(() => {
          snackbarRef.current.success('Berhasil memperbaharui pengguna!');
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 400) {
        error.response.data.errors.map((field) =>
          setError(field.param, { type: 'custom', message: field.msg })
        );
      } else if (error.response.status === 409) {
        setError('username', { type: 'custom', message: 'Username already exists' });
      }
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Akun dan Pengguna</Heading>
      <SubHeading>Edit Pengguna</SubHeading>

      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="max-w-lg space-y-4">
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
            selected={selectedRole}
          />
          <SubmitButton text="Simpan" />
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
