import { validationResult } from "express-validator";
import Product from "../models/product.js";

// Récupérer toutes les offres
export function getAllProducts(req, res) {
  Product.find({})
    .then((products) => {
      let productList = products.map((product) => ({
        id: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        fournisseur: product.fournisseur,
      }));
      res.status(200).json(productList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Créer une nouvelle offre alimentaire
export function createProduct(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Product.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      fournisseur: req.body.fournisseur,
    })
      .then((newProduct) => {
        res.status(201).json({
          id: newProduct._id,
          title: newProduct.title,
          description: newProduct.description,
          category: newProduct.category,
          price: newProduct.price,
          quantity: newProduct.quantity,
          image: newProduct.image,
          fournisseur: newProduct.fournisseur,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Récupérer une offre par son ID
export function getProductById(req, res) {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Offre alimentaire non trouvée' });
      }
      res.status(200).json({
        id: product._id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
        fournisseur: product.fournisseur,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Mettre à jour une offre
export function updateProduct(req, res) {
  let newProduct = {};
  if (req.file == undefined) {
    newProduct = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    };
  } else {
    newProduct = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    };
  }
  Product.findByIdAndUpdate(req.params.productId, newProduct)
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Offre alimentaire non trouvée' });
      }
      res.status(200).json({
        id: updatedProduct._id,
        title: updatedProduct.title,
        description: updatedProduct.description,
        category: updatedProduct.category,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity,
        image: updatedProduct.image,
        fournisseur: updatedProduct.fournisseur,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// Supprimer une offre
export function deleteProduct(req, res) {
  Product.findByIdAndDelete(req.params.productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Offre alimentaire non trouvée' });
      }
      res.status(200).json({ message: 'Offre alimentaire supprimée avec succès' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
