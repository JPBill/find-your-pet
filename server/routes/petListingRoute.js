import express from 'express';
import { createPetListing } from '../controllers/petListingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPetListing);

export default router;
