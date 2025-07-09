const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config");

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
const model = genAI.getGenerativeModel({ model: config.gemini.model });

/**
 * Generates a response based on the query and context
 * @param {string} query - The user's query
 * @param {string} context - The context information
 * @returns {Promise<string>} - The generated response
 */
async function generateResponse(query, context) {
    try {
        const prompt = `
Context information is below.
---------------------
${context}
---------------------
Given the context information, answer the following query:
Query: ${query}

Answer: `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text;
    } catch (error) {
        console.error("Error generating response:", error);
        throw error;
    }
}

module.exports = {
    generateResponse
}; 