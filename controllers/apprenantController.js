/**
 * importe la classe PrismaClient depuis la bibliothèque @prisma/client. 
 * Ce qui nous permet de créer des instances de ce client.
 */
import { PrismaClient } from '@prisma/client';

// Crée une nouvelle instance de PrismaClient
const prisma = new PrismaClient();

//Afficher tous les apprenants
export const getAllApprenants = async (req, res) => {
    try {
        const apprenants = await prisma.apprenant.findMany();
        res.json(apprenants);
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

//Afficher un apprenant par son ID
export const getApprenantById = async (req, res) => {
    try {
        const { id } = req.params;
        const apprenant = await prisma.apprenant.findUnique({ where: { id_apprenant: parseInt(id) } });
        if (apprenant) {
            res.json(apprenant);
        } else {
            res.status(404).json({ error: 'Apprenant introuvable' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

//Créer un nouvel apprenant
export const createApprenant = async (req, res) => {
    try {
        const { nom, prenom, classe, sexe, nom_et_prenom_tuteur, tel_tuteur, email_tuteur } = req.body;
        
        // Log the received data
        console.log('Received data:', req.body);

        // Check if all required fields are present
        if (!nom || !prenom || !classe || !sexe || !nom_et_prenom_tuteur || !tel_tuteur || !email_tuteur) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const newApprenant = await prisma.apprenant.create({
            data: { nom, prenom, classe, sexe, nom_et_prenom_tuteur, tel_tuteur, email_tuteur }
        });
        res.status(201).json(newApprenant);
    } catch (error) {
        console.error('Error creating apprenant:', error); // Log the error details
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

//Mettre à jour un apprenant
export const updateApprenant = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, classe, sexe, nom_et_prenom_tuteur, tel_tuteur, email_tuteur } = req.body;
        
        // Log the received data
        console.log('Received data for update:', req.body);

        // Check if all required fields are present
        if (!nom || !prenom || !classe || !sexe || !nom_et_prenom_tuteur || !tel_tuteur || !email_tuteur) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Check if email_tuteur is unique
        const existingApprenant = await prisma.apprenant.findUnique({ where: { email_tuteur } });
        if (existingApprenant && existingApprenant.id_apprenant !== parseInt(id)) {
            return res.status(400).json({ error: 'L\'email du tuteur existe déjà' });
        }

        const updatedApprenant = await prisma.apprenant.update({
            where: { id_apprenant: parseInt(id) },
            data: { nom, prenom, classe, sexe, nom_et_prenom_tuteur, tel_tuteur, email_tuteur }
        });
        res.json(updatedApprenant);
    } catch (error) {
        console.error('Error updating apprenant:', error); // Log the error details
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

//Supprimer un apprenant
export const deleteApprenant = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.apprenant.delete({ where: { id_apprenant: parseInt(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};
