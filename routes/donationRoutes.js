import express from 'express';
import { body, param } from 'express-validator';
import { getAllDonations, createDonation, getDonationById, updateDonation, deleteDonation } from '../controllers/donationController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllDonations)
  .post(
    body('donateur').isMongoId(),
    body('beneficiaire').isMongoId(),
    body('idProduct').isMongoId(),
    body('quantite').isNumeric(),
    body('dateDisponibilite').isISO8601(),
    createDonation
  );

router
  .route('/:donationId')
  .get(getDonationById)
  .put(
    param('donationId').isMongoId(),
    body('donateur').isMongoId(),
    body('beneficiaire').isMongoId(),
    body('idProduct').isMongoId(),
    body('quantite').isNumeric(),
    body('dateDisponibilite').isISO8601(),
    body('etat').isString(),
    updateDonation
  )
  .delete(
    param('donationId').isMongoId(),
    deleteDonation
  );

export default router;
