import mongoose from 'mongoose';
import user from './user.js'; 

const { Schema, model } = mongoose;

const fournisseurSchema = new Schema(
    {
        role: {
            type: String,
            required: true
        },
        workHours: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
      
    },
    {
        timestamps: true
    }
);

const Fournisseur = user.discriminator('Fournisseur', fournisseurSchema);
export default  Fournisseur;
