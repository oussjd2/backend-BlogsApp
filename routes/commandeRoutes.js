import express from "express";
import { body, param } from "express-validator";
import { getAllCommandes, createCommande, getCommandeById, updateCommande, deleteCommande } from "../controllers/commandeController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCommandes)
  .post(
    body("idUser").isMongoId(),
    body("idProduct").isMongoId(),
    body("pickupTime").isISO8601(),
    createCommande
  );

router
  .route("/:commandeId")
  .get(getCommandeById)
  .put(
    param("commandeId").isMongoId(),
    body("idUser").isMongoId(),
    body("idProduct").isMongoId(),
    body("pickupTime").isISO8601(),
    body("status").isString(),
    updateCommande
  )
  .delete(
    param("commandeId").isMongoId(),
    deleteCommande
  );

export default router;
