import { validationResult } from 'express-validator';
import Donation from '../models/donation.js';

// Récupérer toutes les dons
export function getAllDonations(req, res) {
  Donation.find({})
    .then((donations) => {
      let donationList = donations.map((donation) => ({
        id: donation._id,
        donateur: donation.donateur,
        beneficiaire: donation.beneficiaire,
        idProduct: donation.idProduct,
        quantite: donation.quantite,
        dateDisponibilite: donation.dateDisponibilite,
        etat: donation.etat,
      }));
      res.status(200).json(donationList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Créer une nouvelle donation
export function createDonation(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Donation.create({
      donateur: req.body.donateur,
      beneficiaire: req.body.beneficiaire,
      idProduct: req.body.idProduct,
      quantite: req.body.quantite,
      dateDisponibilite: req.body.dateDisponibilite,
      etat: req.body.etat || 'En attente',
    })
      .then((newDonation) => {
        res.status(201).json({
          id: newDonation._id,
          donateur: newDonation.donateur,
          beneficiaire: newDonation.beneficiaire,
          idProduct: newDonation.idProduct,
          quantite: newDonation.quantite,
          dateDisponibilite: newDonation.dateDisponibilite,
          etat: newDonation.etat,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Récupérer une donation par son ID
export function getDonationById(req, res) {
  Donation.findById(req.params.donationId)
    .then((donation) => {
      if (!donation) {
        return res.status(404).json({ message: 'Donation non trouvée' });
      }
      res.status(200).json({
        id: donation._id,
        donateur: donation.donateur,
        beneficiaire: donation.beneficiaire,
        idProduct: donation.idProduct,
        quantite: donation.quantite,
        dateDisponibilite: donation.dateDisponibilite,
        etat: donation.etat,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour une donation
export function updateDonation(req, res) {
  let newDonation = {
    donateur: req.body.donateur,
    beneficiaire: req.body.beneficiaire,
    idProduct: req.body.idProduct,
    quantite: req.body.quantite,
    dateDisponibilite: req.body.dateDisponibilite,
    etat: req.body.etat || 'En attente',
  };

  Donation.findByIdAndUpdate(req.params.donationId, newDonation)
    .then((updatedDonation) => {
      if (!updatedDonation) {
        return res.status(404).json({ message: 'Donation non trouvée' });
      }
      res.status(200).json({
        id: updatedDonation._id,
        donateur: updatedDonation.donateur,
        beneficiaire: updatedDonation.beneficiaire,
        idProduct: updatedDonation.idProduct,
        quantite: updatedDonation.quantite,
        dateDisponibilite: updatedDonation.dateDisponibilite,
        etat: updatedDonation.etat,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Supprimer une donation
export function deleteDonation(req, res) {
  Donation.findByIdAndDelete(req.params.donationId)
    .then((deletedDonation) => {
      if (!deletedDonation) {
        return res.status(404).json({ message: 'Donation non trouvée' });
      }
      res.status(200).json({ message: 'Donation supprimée avec succès' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
