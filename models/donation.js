import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const donationSchema = new Schema(
  {
    donateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fournisseur',
      required: true,
    },
    beneficiaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beneficiaire',
      required: true,
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantite: {
      type: Number,
      required: true,
    },
    dateDisponibilite: {
      type: Date,
      required: true,
    },
    etat: {
      type: String,
      default: 'En attente',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Donnation', donationSchema);
