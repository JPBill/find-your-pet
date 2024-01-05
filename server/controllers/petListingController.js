import PetListing from '../models/PetListingModel.js';
import { errorHandler } from '../utils/error.js';

export const createPetListing = async (req, res, next) => {
  try {
    const listing = await PetListing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deletePetListing = async (req, res, next) => {
  const listing = await PetListing.findById(req.params.id);

  if (!listing) {
    return next(
      errorHandler(404, 'No pudimos encontrar tu lista de mascotas.')
    );
  }

  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(404, 'Solamente puedes eliminar tu lista de mascotas.')
    );
  }

  try {
    await PetListing.findByIdAndDelete(req.params.id);
    res.status(200).json('El listado fue eliminado!');
  } catch (error) {
    next(error);
  }
};

export const updatePetListing = async (req, res, next) => {
  const listing = await PetListing.findById(req.params.id);

  if (!listing) {
    return next(
      errorHandler(404, 'No pudimos encontrar tu lista de mascotas.')
    );
  }

  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, 'Solamente puedes editar tu lista de mascotas.')
    );
  }

  try {
    const updatedListing = await PetListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await PetListing.findById(req.params.id);
    if (!listing) {
      return next(
        errorHandler(404, 'No pudimos encontrar tu lista de mascotas.')
      );
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
