import express from "express";
import { body, param } from "express-validator";
import { getAllReclamations, createReclamation, getReclamationById, updateReclamation, deleteReclamation, } from "../controllers/reclamationController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllReclamations)
  .post(
    body("idUser").isMongoId(),
    body("idProduct").isMongoId(),
    body("pickupTime").isISO8601(),
    body("description").isString(),
    createReclamation
  );

router
  .route("/:reclamationId")
  .get(getReclamationById)
  .put(
    param("reclamationId").isMongoId(),
    body("idUser").isMongoId(),
    body("idProduct").isMongoId(),
    body("pickupTime").isISO8601(),
    body("description").isString(),
    updateReclamation
  )
  .delete(
    param("reclamationId").isMongoId(),
    deleteReclamation
  );

export default router;
