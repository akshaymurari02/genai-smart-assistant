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

const lines = fs
    .readFileSync(inputPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const runChat = async () => {
    const chat = ai.chats.create({ model: "gemini-1.5-flash" });

    for (const msg of lines) {
        console.log("🗣️ User:", msg);
        const res = await chat.sendMessage({ message: [{ text: msg }] });
        console.log("🤖 Bot:", res.text, "\n");
    }
};

runChat();
