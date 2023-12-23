const kindOfAnimal = [
  { id: 'dog', title: 'Perro/a' },
  { id: 'cat', title: 'Gato/a' },
  { id: 'other', title: 'Otro/a' },
];

const AddPet = () => {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Añade mascotas en adopción
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700">
                Animal
              </label>

              <fieldset className="mt-2">
                <legend className="sr-only">Tipo de animal</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {kindOfAnimal.map((animal) => (
                    <div key={animal.id} className="flex items-center">
                      <input
                        id={animal.id}
                        name="kind-of-animal"
                        type="radio"
                        defaultChecked={animal.id === 'dog'}
                        className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
                      />
                      <label
                        htmlFor={animal.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {animal.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="description"
                    id="description"
                    placeholder="Hembra adulta de tamaño mediano..."
                    className="appearance-none px-3 py-2 border shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder:text-sm"
                    defaultValue={''}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block mt-6 mb-2 text-sm font-medium text-gray-700"
                  htmlFor="multiple_files"
                >
                  Imágenes
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
                  id="multiple_files"
                  type="file"
                  accept="image/*"
                  multiple
                />
              </div>
              <div className="mt-3">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-gray-200 transition hover:text-teal-600/75 focus:outline-none">
                  Subir imágenes
                </button>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ubicación
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    maxLength="40"
                    placeholder="Rosario, Santa Fe"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  Añadir a la lista de adopción
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
