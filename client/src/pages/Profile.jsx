import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logOutUserStart,
} from '../redux/user/userSlice';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSucess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogOut = async () => {
    try {
      dispatch(logOutUserStart());
      const res = await fetch('/server/auth/logout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/server/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/server/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingError(true);
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              <button
                disabled={loading}
                className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-gray-200 transition hover:text-teal-600/75 focus:outline-none"
              >
                {loading ? 'Cargando...' : 'Guardar cambios de mi cuenta'}
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-6">
            <span
              onClick={handleDeleteUser}
              className="text-red-600 text-sm cursor-pointer hover:underline"
            >
              Eliminar cuenta
            </span>

            <span
              onClick={handleLogOut}
              className="text-red-600 text-sm cursor-pointer hover:underline"
            >
              Cerrar sesión
            </span>
          </div>
          <p className="text-red-700 mt-4">{error ? error : ''}</p>
          <p className="text-green-700 mt-4">
            {updateSucess ? 'Usuario actualizado éxitosamente' : ''}
          </p>
          <button onClick={handleShowListing} className="text-gray-700">
            Ver listado
          </button>
          <p className="text-red-700 mt-4">
            {showListingError ? 'Error al mostrar el listado.' : ''}
          </p>
        </div>
      </div>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Tu lista de mascotas en adopción
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listings/${listing._id}`}>
                <img
                  src={listing.image}
                  alt={listing.animal}
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/listings/${listing._id}`}
              >
                <p>{listing.description}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  // onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Eliminar
                </button>
                <Link to={`/update-listings/${listing._id}`}>
                  <button className="text-green-700 uppercase">Editar</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
