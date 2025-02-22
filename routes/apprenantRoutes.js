import express from 'express';
//Import de toutes les fonctions du controller du fichier apprenantController.js
import { getAllApprenants, getApprenantById, createApprenant, updateApprenant, deleteApprenant } from '../controllers/apprenantController.js';

const router = express.Router();

// Route pour Afficher tous apprenants
router.get('/', getAllApprenants);

// Route pour Afficher un apprenant par son ID
router.get('/:id', getApprenantById);

// Route pour Créer un nouvel apprenant
router.post('/', createApprenant);

// Route pour Modifier un apprenant par son ID
router.put('/:id', updateApprenant);

// Route pour Supprimer un apprenant par son ID
router.delete('/:id', deleteApprenant);

export default router;
