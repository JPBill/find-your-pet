import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BsCloudUpload } from 'react-icons/bs';
import { imageToBase64 } from '../utility/imageToBase64';

const kindOfAnimal = [
  { id: 'dog', title: 'Perro/a' },
  { id: 'cat', title: 'Gato/a' },
  { id: 'other', title: 'Otro/a' },
];

const UpdatePet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    image: '',
    animal: '',
    description: '',
    location: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/server/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await imageToBase64(e.target.files[0]);

    setFormData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { animal, location, description, image } = formData;
    const isValid = animal && location && description && image;

    if (isValid) {
      try {
        const res = await fetch(`/server/listing/update/${params.listingId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });
        const data = await res.json();
        setLoading(false);

        if (data.success === false) {
          console.log('Mascota añadida exitosamente!');
          setError(data.message);
        }
        navigate(`/listings/${data._id}`);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Editar publicación
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                        name="animal"
                        type="radio"
                        value={animal.id}
                        onChange={handleOnChange}
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
                    type="text"
                    rows={4}
                    name="description"
                    id="description"
                    onChange={handleOnChange}
                    value={formData.description}
                    placeholder="Hembra adulta de tamaño mediano..."
                    className="appearance-none px-3 py-2 border shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md placeholder:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block mt-6 text-sm font-medium text-gray-700"
                  htmlFor="image"
                >
                  Imagen
                  <div className="mt-2 flex h-40 w-full cursor-pointer items-center justify-center rounded bg-slate-200">
                    {formData.image ? (
                      <img src={formData.image} className="h-full" alt="Pet" />
                    ) : (
                      <span className="text-3xl">
                        <BsCloudUpload />
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      className="hidden"
                      onChange={uploadImage}
                    />
                  </div>
                </label>
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
                    onChange={handleOnChange}
                    value={formData.location}
                    placeholder="Rosario, Santa Fe"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {loading ? 'Editando...' : 'Guardar cambios'}
                </button>
                {error && <p className="text-red-700 text-sm mt-4">{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePet;
