import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/mascota.png"
          alt="Encuentra tu mascota"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Mi cuenta
        </h2>
        <p className="mt-2 text-center font-medium uppercase text-teal-600 hover:text-teal-500">
          {currentUser.username}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  defaultValue={currentUser.username}
                  // onChange={handleChange}
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentUser.email}
                  // onChange={handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>

            <div>
              <Link
                to="/add-pet"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
              >
                Añadir mascota
              </Link>
              <button className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-gray-200 transition hover:text-teal-600/75 focus:outline-none">
                Guardar cambios de mi cuenta
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-6">
            <span
              // onClick={handleDeleteUser}
              className="text-red-600 text-sm cursor-pointer hover:underline"
            >
              Eliminar cuenta
            </span>

            <span
              // onClick={handleLogOut}
              className="text-red-600 text-sm cursor-pointer hover:underline"
            >
              Cerrar sesión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
