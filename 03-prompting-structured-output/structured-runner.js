import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function runStructuredPrompt(promptPath, inputPath) {
    const promptTemplate = fs.readFileSync(promptPath, "utf-8");
    const textInput = fs.readFileSync(inputPath, "utf-8");

    const prompt = promptTemplate.replace("[TEXT]", textInput);

    const model = ai.chats.create({ model: "gemini-1.5-flash" });

    const result = await model.sendMessage({
        message: [{
            text: prompt,
        }]
    });

    const response = result.text;
    console.log("Structured Output:", response.trim());
}

const PROMPT = process.argv[2]; 
const INPUT = process.argv[3];

runStructuredPrompt(PROMPT, INPUT);
