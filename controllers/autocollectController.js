import { validationResult } from "express-validator";
import Autocollect from "../models/autocollect.js";

// Récupérer toutes les collectes automatiques d'excédents alimentaires
export function getAllAutocollects(req, res) {
  Autocollect.find({})
    .then((autocollects) => {
      let autocollectList = autocollects.map((autocollect) => ({
        id: autocollect._id,
        beneficiaire: autocollect.beneficiaire,
        fournisseur: autocollect.fournisseur,
        idProduct: autocollect.idProduct,
        dayOfWeek: autocollect.dayOfWeek,
        pickupTime: autocollect.pickupTime,
      }));
      res.status(200).json(autocollectList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Créer une nouvelle collecte automatique
export function createAutocollect(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Autocollect.create({
      beneficiaire: req.body.beneficiaire,
      fournisseur: req.body.fournisseur,
      idProduct: req.body.idProduct,
      dayOfWeek: req.body.dayOfWeek,
      pickupTime: req.body.pickupTime,
    })
      .then((newAutocollect) => {
        res.status(201).json({
          id: newAutocollect._id,
          beneficiaire: newAutocollect.beneficiaire,
          fournisseur: newAutocollect.fournisseur,
          idProduct: newAutocollect.idProduct,
          dayOfWeek: newAutocollect.dayOfWeek,
          pickupTime: newAutocollect.pickupTime,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Récupérer une collecte automatique
export function getAutocollectById(req, res) {
  Autocollect.findById(req.params.autocollectId)
    .then((autocollect) => {
      if (!autocollect) {
        return res.status(404).json({ message: 'Collecte automatique non trouvée' });
      }
      res.status(200).json({
        id: autocollect._id,
        beneficiaire: autocollect.beneficiaire,
        fournisseur: autocollect.fournisseur,
        idProduct: autocollect.idProduct,
        dayOfWeek: autocollect.dayOfWeek,
        pickupTime: autocollect.pickupTime,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour une collecte automatique
export function updateAutocollect(req, res) {
  let newAutocollect = {
    beneficiaire: req.body.beneficiaire,
    fournisseur: req.body.fournisseur,
    idProduct: req.body.idProduct,
    dayOfWeek: req.body.dayOfWeek,
    pickupTime: req.body.pickupTime,
  };

  Autocollect.findByIdAndUpdate(req.params.autocollectId, newAutocollect)
    .then((updatedAutocollect) => {
      if (!updatedAutocollect) {
        return res.status(404).json({ message: 'Collecte automatique non trouvée' });
      }
      res.status(200).json({
        id: updatedAutocollect._id,
        beneficiaire: updatedAutocollect.beneficiaire,
        fournisseur: updatedAutocollect.fournisseur,
        idProduct: updatedAutocollect.idProduct,
        dayOfWeek: updatedAutocollect.dayOfWeek,
        pickupTime: updatedAutocollect.pickupTime,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Supprimer une collecte automatique
export function deleteAutocollect(req, res) {
  Autocollect.findByIdAndDelete(req.params.autocollectId)
    .then((deletedAutocollect) => {
      if (!deletedAutocollect) {
        return res.status(404).json({ message: 'Collecte automatique non trouvée' });
      }
      res.status(200).json({ message: 'Collecte automatique supprimée avec succès' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
