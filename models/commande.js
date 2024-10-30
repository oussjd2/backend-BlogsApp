import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commandeSchema = new Schema(
    {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        idProduct: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
        pickupTime: {
            type: Date, 
            required: true
        },
        status: {
            type: String, 
            default: 'En attente'
        }
    },
    {
        timestamps: true
    }
);

export default model('Commande', commandeSchema);