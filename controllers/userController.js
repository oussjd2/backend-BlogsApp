import User from "../models/user.js";

export function signin(req, res) {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function signup(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    adresse: req.body.adresse
  })
    .then((newUser) => {
      res.status(200).json({
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        adresse: newUser.adresse
       
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  let newUser = {};
  if(req.file == undefined) {
    newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      adresse: req.body.adresse
      
    }
  }
  else {
    newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      adresse: req.body.adresse
    }
  }
  User.findByIdAndUpdate(req.params.id, newUser)
    .then((doc1) => {
      User.findById(req.params.id)
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





// Importez votre modèle User ici

export function getAllUsers(req, res) {
  User.find({})
    .then((users) => {
      let userList = users.map((user) => ({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        adresse: user.adresse,
      }));
      res.status(200).json(userList);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

