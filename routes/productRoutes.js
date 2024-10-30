import express from "express";
import { body, param } from "express-validator";
import multer from "../middlewares/multer-config.js";
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    multer("image"),
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("category").isLength({ min: 2 }),
    body("price").isNumeric(),
    body("quantity").isNumeric(),
    body("fournisseur").isMongoId(),
    createProduct
  );

router
  .route("/:productId")
  .get(
    param("productId").isMongoId(),
    getProductById
  )
  .put(
    multer("image"),
    param("productId").isMongoId(),
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("category").isLength({ min: 2 }),
    body("price").isNumeric(),
    body("quantity").isNumeric(),
    updateProduct
  )
  .delete(
    param("productId").isMongoId(),
    deleteProduct
  );

export default router;
