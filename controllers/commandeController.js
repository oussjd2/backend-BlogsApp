import { validationResult } from "express-validator";
import Commande from "../models/commande.js";

// Récupérer toutes les commandes
export function getAllCommandes(req, res) {
  Commande.find({})
    .then((commandes) => {
      let commandeList = commandes.map((commande) => ({
        id: commande._id,
        idUser: commande.idUser,
        idProduct: commande.idProduct,
        pickupTime: commande.pickupTime,
        status: commande.status,
      }));
      res.status(200).json(commandeList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Créer une nouvelle commande
export function createCommande(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Commande.create({
      idUser: req.body.idUser,
      idProduct: req.body.idProduct,
      pickupTime: req.body.pickupTime,
      status: "En attente",
    })
      .then((newCommande) => {
        res.status(201).json({
          id: newCommande._id,
          idUser: newCommande.idUser,
          idProduct: newCommande.idProduct,
          pickupTime: newCommande.pickupTime,
          status: newCommande.status,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Récupérer une commande par son ID
export function getCommandeById(req, res) {
  Commande.findById(req.params.commandeId)
    .then((commande) => {
      if (!commande) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
      res.status(200).json({
        id: commande._id,
        idUser: commande.idUser,
        idProduct: commande.idProduct,
        pickupTime: commande.pickupTime,
        status: commande.status,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour une commande
export function updateCommande(req, res) {
  let newCommande = {
    idUser: req.body.idUser,
    idProduct: req.body.idProduct,
    pickupTime: req.body.pickupTime,
    status: req.body.status,
  };

  Commande.findByIdAndUpdate(req.params.commandeId, newCommande)
    .then((updatedCommande) => {
      if (!updatedCommande) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
      res.status(200).json({
        id: updatedCommande._id,
        idUser: updatedCommande.idUser,
        idProduct: updatedCommande.idProduct,
        pickupTime: updatedCommande.pickupTime,
        status: updatedCommande.status,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Supprimer une commande
export function deleteCommande(req, res) {
  Commande.findByIdAndDelete(req.params.commandeId)
    .then((deletedCommande) => {
      if (!deletedCommande) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
      res.status(200).json({ message: "Commande supprimée avec succès" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
