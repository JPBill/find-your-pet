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
    imagesUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const petListing = mongoose.model('PetListing', petListingSchema);

export default petListing;
