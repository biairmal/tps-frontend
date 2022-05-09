import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from 'components/Forms';
import { loginSchema } from 'validations/authSchema';
import authAPI from 'api/authAPI';
import { UserContext } from 'context/UserContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const { user, setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) });

  const submitForm = async (data) => {
    try {
      const res = await authAPI.login(data);
      console.log(res);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen py-52">
      <div className="bg-white max-w-xl mx-auto rounded-lg p-12 drop-shadow-lg">
        <h1 className="text-2xl text-center font-bold">
          Transaction Processing System
          <br />
        </h1>
        <div className="mt-8 mx-6">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="space-y-4">
              <TextInput
                label="Username"
                name="username"
                error={errors.username?.message}
                register={register}
                placeholder="Masukkan username"
              />
              <TextInput
                label="Password"
                name="password"
                error={errors.password?.message}
                register={register}
                placeholder="Masukkan password"
                type="password"
              />
            </div>

            <button className="bg-sky-400 disabled:opacity-50 mt-12 p-2 w-full rounded-lg text-lg text-white font-bold">
              Login
            </button>
          </form>
        </div>
      </div>
      {user && <Navigate to="/dashboard" />}
    </div>
  );
}

export default LoginPage;
