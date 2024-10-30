import { validationResult } from "express-validator";

import beneficiaire from "../models/beneficiaire.js";

export function getAll(req, res) {
    Beneficiaire.find({})
      .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
          list.push({
            type: docs[i].type,
            
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
      Beneficiaire.create({
        type: req.body.type,
       
      })
        .then((newBeneficiare) => {
          res.status(200).json({
            type:newBeneficiare.type,
            
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  }
  
  export function getOnce(req, res) {
    Beneficiaire.findById(req.params.id)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  
  export function putOnce(req, res) {
    let newBeneficiare= {};
    if(req.file == undefined) {
      newBeneficiare = {
        type:req.body.type,
        
      }
    }
    else {
      newBeneficiare = {
          type:req.body.type,
    
      }
    }
    beneficiaire.findByIdAndUpdate(req.params.id, newBeneficiare)
      .then((doc1) => {
        Beneficiaire.findById(req.params.id)
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
  