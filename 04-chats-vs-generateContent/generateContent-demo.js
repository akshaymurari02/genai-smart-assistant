import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const inputPath = process.argv[2];
if (!inputPath) {
    console.error("❌ Please provide the input file path as an argument.");
    process.exit(1);
}

const input = fs.readFileSync(inputPath, "utf-8");

const run = async () => {
    const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: "user", parts: [{ text: input }] }],
    });

    console.log("🧠 generateContent() Output:\n", result.text);
};

run();
