import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import authAPI from 'api/authAPI';
import { TextInput, PasswordInput } from 'components/Forms';
import Loader from 'components/Loader/Loader';
import { SnackbarContext } from 'context/SnackbarContext';
import { UserContext } from 'context/UserContext';
import { loginSchema } from 'validations/authSchema';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const snackbarRef = useContext(SnackbarContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) });

  const submitForm = async (data) => {
    try {
      setIsLoading(true);
      const res = await authAPI.login(data);
      setIsLoading(false);
      setUser(res.data.data);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 401)
        return snackbarRef.current.error('Username atau password salah!');
      else return snackbarRef.current.error('Login gagal!');
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen py-52">
      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(submitForm)}>
        <div className="bg-white max-w-xl mx-auto rounded-lg p-12 drop-shadow-lg flex flex-col space-y-8">
          <h1 className="text-2xl text-center font-bold">
            Transaction Processing System
            <br />
          </h1>

          <div className="space-y-4">
            <TextInput
              label="Username"
              name="username"
              error={errors.username?.message}
              register={register}
              placeholder="Masukkan username"
            />
            <PasswordInput
              label="Password"
              name="password"
              error={errors.password?.message}
              register={register}
              placeholder="Masukkan password"
            />
          </div>

          <button className="bg-sky-400 disabled:opacity-50 p-2 w-full rounded-lg text-lg text-white font-bold">
            Login
          </button>
        </div>
      </form>
      {user && <Navigate to="/dashboard" />}
    </div>
  );
}

export default LoginPage;
