import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

// Import middleware for error handling
import { notFoundError, errorHandler } from './middlewares/error-handler.js';

// Import existing route modules
import autocollectRoutes from './routes/autocollectRoutes.js';
import beneficiaireRoutes from './routes/beneficiaireRoutes.js';
import commandeRoutes from './routes/commandeRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import fournisseurRoutes from './routes/fournisseurRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reclamationRoutes from './routes/reclamationRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Import blog post routes
import blogPostRoutes from './routes/blogPostRoutes.js'; // Add this line for blog post routes

const app = express();
const port = process.env.PORT || 5000;
const databaseName = 'resQeats';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017`;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
    .connect(`${db_url}/${databaseName}`)
    .then(() => {
      console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
      console.log(err);
    });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));

// Use routes for different parts of the application
app.use('/autocollect', autocollectRoutes);
app.use('/beneficiaire', beneficiaireRoutes);
app.use('/commande', commandeRoutes);
app.use('/donation', donationRoutes);
app.use('/fournisseur', fournisseurRoutes);
app.use('/product', productRoutes);
app.use('/reclamation', reclamationRoutes);
app.use('/user', userRoutes);

// Add route for blog posts
app.use('/blogpost', blogPostRoutes); // Use blog post routes

// Error handling middleware
app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
