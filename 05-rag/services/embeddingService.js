const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

/**
 * Generates embeddings for the given text using Gemini's embedding model
 * @param {string} text - The text to generate embeddings for
 * @returns {Promise<number[]>} - The truncated embedding vector
 */
async function generateEmbedding(text) {
    try {
        const embeddingModel = genAI.getGenerativeModel({ model: config.gemini.embeddingModel });
        const result = await embeddingModel.embedContent(text);
        
        // Get the values array from the embedding result
        const values = result.embedding.values;
        
        // Ensure the embedding is a flat array of numbers
        if (Array.isArray(values) && values.every(num => typeof num === 'number')) {
            // Truncate to 512 dimensions to match Pinecone index
            const truncatedValues = values.slice(0, 512);
            console.log("Successfully generated embedding with length:", truncatedValues.length);
            return truncatedValues;
        } else {
            console.error("Unexpected embedding format:", JSON.stringify(result.embedding));
            throw new Error("Invalid embedding format");
        }
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}

module.exports = {
    generateEmbedding
}; 