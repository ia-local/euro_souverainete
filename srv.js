/* * ARCHITECTURE SERVEUR - PROJET EURO-SOUVERAINETÉ (PARTY 647)
 * Rôle : Serveur Statique + API IA (Groq) + Gestionnaire de Mémoire (FS)
 * Documentation : Swagger UI (/api-docs)
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs').promises; // Utilisation des promesses pour l'asynchrone
const Groq = require('groq-sdk');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const PORT = process.env.PORT || 7500;
const SOUP_FILE = path.join(__dirname, './data/soup.md');

// --- 1. CONFIGURATION ---
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const swaggerDocument = YAML.load('./euro_souv.yaml');

// Constitution de l'IA
const SYSTEM_INVARIANT = `
Tu es l'Intelligence Souveraine du Parti 647 et du système CVNU.
Ta mission : Analyser les données économiques et assister l'architecture du projet.
Style : Mathématique, Rigoureux, Structuré.
Contexte : Économie circulaire, Valeur Travail, Souveraineté Monétaire.
Règle : Tu as accès à un fichier de contexte historique (SOUP). Utilise-le pour maintenir la cohérence.
`;

// --- 2. MIDDLEWARES ---
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'docs')));

// Route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- 3. FONCTIONS UTILITAIRES (CRUD SOUP) ---

// Initialise le fichier soup.md s'il n'existe pas
async function initSoup() {
    try {
        await fs.access(SOUP_FILE);
    } catch {
        await fs.writeFile(SOUP_FILE, "# MÉMOIRE HISTORIQUE DU PROJET 647\n\n");
        console.log("Creation du fichier soup.md...");
    }
}
initSoup();

// Lecture de la mémoire
async function readSoup() {
    try {
        const data = await fs.readFile(SOUP_FILE, 'utf8');
        return data;
    } catch (err) {
        return "Aucune mémoire historique disponible.";
    }
}

// Écriture (Append) dans la mémoire
async function appendSoup(content) {
    const timestamp = new Date().toISOString();
    const entry = `\n- [${timestamp}] ${content}`;
    await fs.appendFile(SOUP_FILE, entry);
}

// --- 4. API ENDPOINTS ---

// A. Gestion de la mémoire (CRUD soup.md)
app.get('/api/soup', async (req, res) => {
    const content = await readSoup();
    res.send(content);
});

app.post('/api/soup', async (req, res) => {
    if (!req.body.content) return res.status(400).json({error: "Contenu requis"});
    await appendSoup(req.body.content);
    res.json({status: "success", message: "Mémoire mise à jour."});
});

// B. Intelligence Souveraine (avec DataLoader)
app.post('/api/sovereign-intelligence', async (req, res) => {
    try {
        const userQuery = req.body.query;
        console.log(`[IA Request] ${userQuery}`);

        // DATALOADER: On charge le contexte historique avant d'interroger l'IA
        const contextMemory = await readSoup();
        
        // Construction du prompt enrichi
        const messages = [
            { role: "system", content: SYSTEM_INVARIANT },
            { role: "system", content: `CONTEXTE MÉMOIRE (soup.md):\n${contextMemory}` }, // Injection du contexte
            { role: "user", content: userQuery }
        ];

        const completion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
            max_tokens: 1024,
        });

        const aiResponse = completion.choices[0]?.message?.content || "Erreur de calcul.";

        // Optionnel : On peut enregistrer automatiquement la réponse de l'IA dans la soup si nécessaire
        // await appendSoup(`IA RESPONSE: ${aiResponse}`); 

        res.json({
            status: "success",
            response: aiResponse,
            context_used: true
        });

    } catch (error) {
        console.error("Erreur Groq:", error);
        res.status(500).json({ status: "error", message: "Échec du traitement LPU" });
    }
});

// --- 5. ROUTE FALLBACK ---
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// --- 6. DÉMARRAGE ---
app.listen(PORT, () => {
    console.log(`╔════════════════════════════════════════════════╗`);
    console.log(`║ SERVEUR SOUVERAIN PARTY 647 (v2.0)             ║`);
    console.log(`║------------------------------------------------║`);
    console.log(`║ 🌍 Web       : http://localhost:${PORT}           ║`);
    console.log(`║ 📄 Swagger   : http://localhost:${PORT}/api-docs  ║`);
    console.log(`║ 🧠 IA Engine : Groq + Context (soup.md)        ║`);
    console.log(`╚════════════════════════════════════════════════╝`);
});