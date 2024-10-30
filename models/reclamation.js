import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reclamationSchema = new Schema(
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
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Reclamation', reclamationSchema);