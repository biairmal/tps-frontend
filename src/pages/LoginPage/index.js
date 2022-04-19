import TextInput from 'components/Forms/TextInput';
import { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const buttonIsDisabled = () => {
    if (username === '' || password === '') return true;
    return false;
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen py-52">
      <div className="bg-white max-w-xl mx-auto rounded-lg p-12 drop-shadow-lg">
        <h1 className="text-2xl text-center font-bold">
          Transaction Processing System
          <br />
        </h1>
        <div className="mt-8 mx-6">
          <div className="space-y-4">
            <TextInput
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              placeholder="Masukkan username"
            />
            <TextInput
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Masukkan password"
              type="password"
            />
          </div>

          <button
            disabled={buttonIsDisabled()}
            className="bg-sky-400 disabled:opacity-50 mt-12 p-2 w-full rounded-lg text-lg text-white font-bold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
