import express from 'express';
// Import de toutes les fonctions du controller du fichier apprenantController.js
import apprenantRoutes from './routes/apprenantRoutes.js';

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse x-www-form-urlencoded bodies

// Route principale de notre API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Utiliser les routes apprenant
app.use('/apprenants', apprenantRoutes);

// Le serveur écoute sur le port défini
app.listen(port, () => {
  console.log(`Serveur en écoute sur : http://localhost:${port}`);
});
