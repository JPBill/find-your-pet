import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-24 mt-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="block text-teal-600">
            <span className="sr-only">Inicio</span>
            <img
              src="/logo.png"
              className="h-12 w-12 block"
              alt="Encuentra tu mascota"
            />
          </Link>

          <div className="flex items-center">
            <form className="relative">
              <label className="sr-only">Buscar...</label>

              <input
                className="h-10 w-full rounded-full border border-gray-200 bg-white pe-10 ps-4 text-sm sm:w-64"
                type="text"
                placeholder="Buscar..."
              />

              <div className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700">
                <span className="sr-only">Buscar</span>
                <IoIosSearch className="h-4 w-4" />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                to="/login"
                className="hidden rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-teal-700 md:block"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="hidden rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 md:block"
              >
                Registrate
              </Link>
            </div>

            <div className="block md:hidden">
              <FaRegUserCircle className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
