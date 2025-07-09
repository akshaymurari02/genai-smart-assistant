require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    pinecone: {
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
        indexName: process.env.PINECONE_INDEX_NAME
    },
    gemini: {
        apiKey: process.env.GOOGLE_API_KEY,
        model: "gemini-1.5-flash",
        embeddingModel: "embedding-001"
    }
}; 