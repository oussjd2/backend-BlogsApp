import { validationResult } from "express-validator";
import Reclamation from "../models/reclamation.js";

// Récupérer toutes les réclamations
export function getAllReclamations(req, res) {
  Reclamation.find({})
    .then((reclamations) => {
      let reclamationList = reclamations.map((reclamation) => ({
        id: reclamation._id,
        idUser: reclamation.idUser,
        idProduct: reclamation.idProduct,
        pickupTime: reclamation.pickupTime,
        description: reclamation.description,
      }));
      res.status(200).json(reclamationList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Créer une nouvelle réclamation
export function createReclamation(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Reclamation.create({
      idUser: req.body.idUser,
      idProduct: req.body.idProduct,
      pickupTime: req.body.pickupTime,
      description: req.body.description,
    })
      .then((newReclamation) => {
        res.status(201).json({
          id: newReclamation._id,
          idUser: newReclamation.idUser,
          idProduct: newReclamation.idProduct,
          pickupTime: newReclamation.pickupTime,
          description: newReclamation.description,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Récupérer une réclamation par son ID
export function getReclamationById(req, res) {
  Reclamation.findById(req.params.reclamationId)
    .then((reclamation) => {
      if (!reclamation) {
        return res.status(404).json({ message: 'Réclamation non trouvée' });
      }
      res.status(200).json({
        id: reclamation._id,
        idUser: reclamation.idUser,
        idProduct: reclamation.idProduct,
        pickupTime: reclamation.pickupTime,
        description: reclamation.description,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour une réclamation
export function updateReclamation(req, res) {
  let newReclamation = {
    idUser: req.body.idUser,
    idProduct: req.body.idProduct,
    pickupTime: req.body.pickupTime,
    description: req.body.description,
  };

  Reclamation.findByIdAndUpdate(req.params.reclamationId, newReclamation)
    .then((updatedReclamation) => {
      if (!updatedReclamation) {
        return res.status(404).json({ message: 'Réclamation non trouvée' });
      }
      res.status(200).json({
        id: updatedReclamation._id,
        idUser: updatedReclamation.idUser,
        idProduct: updatedReclamation.idProduct,
        pickupTime: updatedReclamation.pickupTime,
        description: updatedReclamation.description,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Supprimer une réclamation
export function deleteReclamation(req, res) {
  Reclamation.findByIdAndDelete(req.params.reclamationId)
    .then((deletedReclamation) => {
      if (!deletedReclamation) {
        return res.status(404).json({ message: 'Réclamation non trouvée' });
      }
      res.status(200).json({ message: 'Réclamation supprimée avec succès' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
