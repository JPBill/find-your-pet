import mongoose from 'mongoose';

const petListingSchema = new mongoose.Schema(
  {
    animal: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PetListing = mongoose.model('PetListing', petListingSchema);

export default PetListing;
