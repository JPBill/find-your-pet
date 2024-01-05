import PetListing from '../models/PetListingModel.js';

export const createPetListing = async (req, res, next) => {
  try {
    const listing = await PetListing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
