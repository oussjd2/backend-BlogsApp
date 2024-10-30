import express from "express";
import { body } from "express-validator";

import multer from "../middlewares/multer-config.js";

import { getAllUsers, signin, signup, putOnce } from "../controllers/userController.js";

const router = express.Router();
router.route("/").get(getAllUsers);

router
  .route("/signin")
  .post(
   
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 6}),
    body("email").isLength({ min:14}),
    body("phoneNumber").isNumeric(),
    body("adresse").isLength({min:7}),
    signin
  );

router.route("/signup").post(signup);

router
  .route("/:id")
  .put(
    body("username").isLength({ min: 5 }),
    body("password").isLength({ min: 6}),
    body("email").isLength({ min:14}),
    body("phoneNumber").isNumeric(),
    body("adresse").isLength({min:7}),
   
    putOnce
  );


export default router;