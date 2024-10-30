import { validationResult } from "express-validator";

import Fournisseur from "../models/fournisseur.js";

export function getAll(req, res) {
  Fournisseur.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          type: docs[i].type,
          workHours: docs[i].workHours,
          image: docs[i].image,
          
        });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Fournisseur.create({
      type: req.body.type,
      workHours: req.body.workHours,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newFournisseur) => {
        res.status(200).json({
          type: newFournisseur.type,
          workHours: newFournisseur.workHours,
          image: newFournisseur.image
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Fournisseur.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newFournisseur= {};
  if(req.file == undefined) {
    newFournisseur = {
      type: req.body.type,
      workHours: req.body.workHours,
      image: req.body.image
    }
  }
  else {
    newFournisseur = {
        type: req.body.type,
        workHours: req.body.workHours,
        image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
    }
  }
  Fournisseur.findByIdAndUpdate(req.params.id, newFournisseur)
    .then((doc1) => {
      Fournisseur.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
