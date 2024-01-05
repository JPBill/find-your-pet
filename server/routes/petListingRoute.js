import express from 'express';
import {
  createPetListing,
  deletePetListing,
  updatePetListing,
  getListing,
} from '../controllers/petListingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPetListing);
router.delete('/delete/:id', verifyToken, deletePetListing);
router.post('/update/:id', verifyToken, updatePetListing);
router.get('/get/:id', getListing);

export default router;
