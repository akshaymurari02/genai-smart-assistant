const { Pinecone } = require("@pinecone-database/pinecone");
const config = require("../config");
const { generateEmbedding } = require("./embeddingService");

const pinecone = new Pinecone({
    apiKey: config.pinecone.apiKey,
});

/**
 * Populates Pinecone with the given documents
 * @param {Array<{id: string, text: string, metadata: object}>} documents - The documents to populate
 * @returns {Promise<number>} - The number of documents added
 */
async function populateDocuments(documents) {
    const index = pinecone.index(config.pinecone.indexName);
    const batchSize = 10;
    const vectors = [];

    console.log("Generating embeddings for documents...");

    try {
        for (const doc of documents) {
            const embedding = await generateEmbedding(doc.text);
            
            const vector = {
                id: doc.id,
                values: embedding,
                metadata: {
                    ...doc.metadata,
                    text: doc.text,
                },
            };

            vectors.push(vector);

            // If we have enough vectors, upsert them
            if (vectors.length >= batchSize) {
                await index.upsert(vectors);
                console.log(`Upserted batch of ${vectors.length} vectors`);
                vectors.length = 0; // Clear the array
            }
        }

        // Upsert any remaining vectors
        if (vectors.length > 0) {
            await index.upsert(vectors);
            console.log(`Upserted final batch of ${vectors.length} vectors`);
        }

        return documents.length;
    } catch (error) {
        console.error("Error in populateDocuments:", error);
        throw error;
    }
}

/**
 * Searches for relevant documents based on the query
 * @param {string} query - The search query
 * @param {number} topK - Number of results to return
 * @returns {Promise<Array>} - The search results
 */
async function searchDocuments(query, topK = 3) {
    try {
        const index = pinecone.index(config.pinecone.indexName);
        const queryEmbedding = await generateEmbedding(query);

        const searchResponse = await index.query({
            vector: queryEmbedding,
            topK,
            includeMetadata: true,
        });

        return searchResponse.matches;
    } catch (error) {
        console.error("Error in searchDocuments:", error);
        throw error;
    }
}

module.exports = {
    populateDocuments,
    searchDocuments
}; 