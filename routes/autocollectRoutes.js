import express from "express";
import { body, param } from "express-validator";
import { getAllAutocollects, createAutocollect, getAutocollectById, updateAutocollect, deleteAutocollect } from "../controllers/autocollectController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllAutocollects)
  .post(
    body("beneficiaire").isMongoId(),
    body("fournisseur").isMongoId(),
    body("idProduct").isMongoId(),
    body("dayOfWeek").isInt(),
    body("pickupTime").isISO8601(),
    createAutocollect
  );

router
  .route("/:autocollectId")
  .get(getAutocollectById)
  .put(
    param("autocollectId").isMongoId(),
    body("beneficiaire").isMongoId(),
    body("fournisseur").isMongoId(),
    body("idProduct").isMongoId(),
    body("dayOfWeek").isInt(),
    body("pickupTime").isISO8601(),
    updateAutocollect
  )
  .delete(
    param("autocollectId").isMongoId(),
    deleteAutocollect
  );

export default router;
