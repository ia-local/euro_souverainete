/* * ARCHITECTURE SERVEUR - PROJET EURO-SOUVERAINETÉ (PARTY 647)
 * Rôle : Serveur Statique (Docs) + Passerelle IA Souveraine (Groq LPU)
 * Modèle : llama-3.1-8b-instant
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const Groq = require('groq-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 7500;

// --- 1. CONFIGURATION DE L'IA SOUVERAINE (GROQ) ---
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Prompt Système Invariant (La "Constitution" de l'IA locale)
const SYSTEM_INVARIANT = `
Tu es l'Intelligence Souveraine du Parti 647 et du système CVNU.
Ta mission : Analyser les données économiques pour le Revenu Universel Progressif.
Style : Mathématique, Rigoureux, Structuré.
Contexte : Économie circulaire, Valeur Travail, Souveraineté Monétaire.
Si on te demande une analyse, fournis des données concrètes et logiques.
`;

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(bodyParser.json());

// --- 3. ROUTAGE STATIQUE (GitHub Pages Mirror) ---
// On sert le dossier 'docs' qui contient le site web public
app.use(express.static(path.join(__dirname, 'docs')));

// --- 4. API IA SOUVERAINE (Endpoint interne) ---
// Route pour que le Front-end puisse interroger l'IA sans exposer la clé API
app.post('/api/sovereign-intelligence', async (req, res) => {
    try {
        const userQuery = req.body.query;
        console.log(`[Reçu] Query: ${userQuery}`);

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_INVARIANT },
                { role: "user", content: userQuery }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5, // Équilibre entre créativité et rigueur
            max_tokens: 1024,
        });

        const aiResponse = completion.choices[0]?.message?.content || "Erreur de calcul.";
        
        res.json({
            status: "success",
            model: "llama-3.1-8b-instant",
            response: aiResponse
        });

    } catch (error) {
        console.error("Erreur Groq:", error);
        res.status(500).json({ status: "error", message: "Échec du traitement LPU" });
    }
});

// --- 5. ROUTE PAR DÉFAUT ---
// Renvoie vers l'index si la page n'existe pas (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// --- 6. DÉMARRAGE ---
app.listen(PORT, () => {
    console.log(`╔════════════════════════════════════════════════╗`);
    console.log(`║ SERVEUR SOUVERAIN PARTY 647 EN LIGNE           ║`);
    console.log(`║------------------------------------------------║`);
    console.log(`║ 🌍 Web (Local) : http://localhost:${PORT}         ║`);
    console.log(`║ 🧠 IA Engine   : Groq LPU (Llama-3.1-8b)       ║`);
    console.log(`╚════════════════════════════════════════════════╝`);
});