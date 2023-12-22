import petListing from '../models/petListingModel.js';

export const createPetListing = async (req, res, next) => {
  try {
    const petlisting = await petListing.create(req.body);
    return res.status(201).json(petlisting);
  } catch (error) {
    next(error);
  }
};
