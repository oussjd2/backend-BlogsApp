import mongoose from 'mongoose';
import user from './user.js'; 

const { Schema, model } = mongoose;

const beneficiaireSchema = new Schema(
    {
        role: {
            type: String,
            required: true
        },
       
    },
    {
        timestamps: true
    }
);
const Beneficiare = user.discriminator('Beneficiare', beneficiaireSchema);
export default  Beneficiare;