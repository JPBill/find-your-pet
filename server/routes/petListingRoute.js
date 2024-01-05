import express from 'express';
import {
  createPetListing,
  deletePetListing,
} from '../controllers/petListingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPetListing);
router.delete('/delete/:id', verifyToken, deletePetListing);

export default router;
