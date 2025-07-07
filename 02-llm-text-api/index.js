import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
    try {
        const { prompt, feature, targetLanguage } = req.body;

        if (!prompt || !feature) {
            return res.status(400).json({ error: "Prompt and feature are required" });
        }

        let finalPrompt;

        switch (feature) {
            case "language-detection":
                finalPrompt = `Identify the language of this text and return only the language name:\n\n"${prompt}"`;
                break;

            case "translation":
                if (!targetLanguage) {
                    return res.status(400).json({ error: "Target language is required for translation" });
                }
                finalPrompt = `Translate the following text into ${targetLanguage}:\n\n"${prompt}"`;
                break;

            default:
                return res.status(400).json({ error: "Invalid feature requested" });
        }

        const result = await  ai.models.generateContent({ 
            model: "gemini-1.5-flash",
            contents: [{
                role: "user",
                text: finalPrompt,
            }],
            config: {
                maxOutputTokens: 200,
                temperature: 1,
            }
        });

        res.json({ response: result.text.trim() });
    } catch (err) {
        console.error("Error generating content:", err.message);
        res.status(500).json({ error: "Failed to generate content" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
