const sampleDocuments = require("../models/sampleData");
const { populateDocuments, searchDocuments } = require("../services/pineconeService");
const { generateResponse } = require("../services/generationService");

/**
 * Handles the population of sample data
 */
async function populateData(req, res) {
    try {
        const count = await populateDocuments(sampleDocuments);
        res.json({
            message: "Sample data populated successfully",
            documentsAdded: count,
        });
    } catch (error) {
        console.error("Error populating data:", error);
        res.status(500).json({ 
            error: "Failed to populate data",
            details: error.message
        });
    }
}

/**
 * Handles RAG queries
 */
async function queryRag(req, res) {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        // Search for relevant documents
        const matches = await searchDocuments(query);

        // Extract relevant context from search results
        const relevantDocs = matches.map((match) => match.metadata.text).join("\n\n");

        // Generate response based on context
        const answer = await generateResponse(query, relevantDocs);

        res.json({
            answer,
            sources: matches.map((match) => ({
                score: match.score,
                metadata: match.metadata,
            })),
        });
    } catch (error) {
        console.error("Error in RAG query:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    populateData,
    queryRag
}; 