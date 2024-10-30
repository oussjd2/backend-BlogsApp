import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const autocollectSchema = new Schema(
    {
        beneficiaire: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Beneficiaire',
            required: true
        },
        fournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fournisseur',
            required: true,
        },
        idProduct: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
        dayOfWeek: {
            type: Number,
            required: true
        },
        pickupTime: {
            type: Date, 
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Autocollect', autocollectSchema);
